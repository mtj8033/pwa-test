import { openDB, deleteDB } from "idb/with-async-ittr";
import escapeHTML from "escape-html";

const dbPromise = setupIndexedDB();
const addNewTodoElement = document.querySelector(".new-todo");
const todoListElement = document.querySelector(".todo-list");
const headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
const baseRestUrl = "//jsonplaceholder.typicode.com/todos";

handleAddTodo();
handleRemoveTodo();
readTodos();

export function setupIndexedDB() {
    //check for support of indexeddb
    if (("indexedDB" in window)) {
        return openDB("pwa-test-db", 4, {
            upgrade(db, oldVersion, newVersion, tx) {
                console.log(oldVersion, newVersion);
                let todosOS;
                if (!db.objectStoreNames.contains("todos")) {
                    todosOS = db.createObjectStore("todos");
                } else {
                    todosOS = tx.objectStore("todos");
                }
                if (oldVersion < 2) {
                    todosOS.createIndex("localKey", "localKey", { unique: true });
                }
                if (oldVersion < 3) {
                    todosOS.createIndex("idLocal", ["id", "localKey"], { unique: true });
                }
                if (oldVersion < 4) {
                    todosOS.deleteIndex("idLocal");
                }

            },
        });
    } else {
        return null;
    }
}


if('serviceWorker' in navigator){
  // Handler for messages coming from the service worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log("received event from sw", message);
  });
}
function handleAddTodo() {
    /**
     * Add flow:
     * 1a. Attempt to add to server
     *      a. If successful, update in indexed with the updated info (primary key)
     *      b. if unsuccessful and offline, notify user it was unsuccessful and they are working offline - display todo from indexeddb
     * 1b. Store it in indexeddb
     *
     */
    addNewTodoElement.addEventListener("change", async ({ target }) => {
        const value = target.value.trim();
        addNewTodoElement.value = "";
        console.log("adding todo?", value);

        getId().then(id => {

            let todo = {
                userId: 1,
                title: value,
                completed: false,
                localKey: id,
                saved: false
            };

            fetch(baseRestUrl, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: headers
            })
                .then(response => response.json())
                .then(json => {
                    json.saved = true;
                    updateUI([json], id);
                    updateTodoInLocal(json, id);
                    // })
                    // .catch(reason => {
                    //     if (!navigator.onLine) {
                    //         console.log("offline so loading from indexeddb");
                    //          todo]);
                    //     }
                    //     throw reason;

                });
            //always write to local just in case
            updateUI([todo]);
            writeTodoToLocal(todo, id);
        });
    });
}

async function getId() {
    let db = await dbPromise;
    let tx = db.transaction("todos");
    let localCount = await tx.store.index("localKey").count();
    return 200 + localCount + 1;
}

async function writeTodoToLocal(todo, id) {
    let db = await dbPromise;
    let tx = db.transaction("todos", "readwrite");
    let store = tx.objectStore("todos");
    store.add(todo, id);
    await tx.done;
    console.log("Added a todo to the store", id);
}

async function updateTodoInLocal(todo, id) {
    let db = await dbPromise;
    let tx = db.transaction("todos", "readwrite");
    let store = tx.objectStore("todos");
    store.put(todo, id);
    await tx.done;
    console.log("Added a todo to the store", id);
}

function updateUI(todos, id) {
    todos.forEach(todo => {
        if (id) {
            const existing = document.querySelector(`li[data-id="${id}"]`);
            if (existing) {
                existing.remove();
            }
        }
        const todoToAdd =
            `<li data-id="${id ? id : todo.localKey ? todo.localKey : todo.id}" ${todo.completed ? ' class="completed"' : ""}>
                <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
                <label>${escapeHTML(todo.title)}</label>
                <span ${todo.saved ? ' class="saved"' : todo.localKey ? ' class="local"' : ""}></span>
                <button class="destroy"></button>
            </li>`;
        todoListElement.insertAdjacentHTML("afterbegin", todoToAdd);
    });
    todoListElement.parentElement.style.display = "block";
}

function handleRemoveTodo() {
    /**
     * Remove Flow:
     * 1a. Attempt to remove from server
     *      a. if successful, ?
     *      b. if unsuccessful and offline, notify user
     * 1b. Remove it in indexeddb
     */
    todoListElement.addEventListener("click", async ({ target }) => {
        if (target.classList.contains("destroy")) {
            const todoElement = target.parentElement;
            let db = await dbPromise;
            let tx = db.transaction("todos", "readwrite");
            let store = tx.objectStore("todos");
            let deleted = await store.delete(Number(todoElement.getAttribute("data-id")));
            todoListElement.removeChild(todoElement);
            if (todoListElement.children.length === 0) {
                todoListElement.parentElement.style.display = "none";
            }

            await tx.done;
            console.log("deleted a todo from the store");
        }
    });
}

async function readTodos() {
    let startId = await getId();
    /**
     * Load flow:
     * 1. Attempt to load from network
     *      1a. If successful then store into indexeddb and display
     *      1b. if unsuccessful and offline then retrieve from indexeddb and display, note to user that they are working offline
     */
    /**
     * Load flow:
     *
     * 1. Read local from indexeddb (wouldn't do this if you had a real backend api to call/save)
     * 2. Read all non-local from rest call
     *      2a. Fallback to indexeddb for non-local
     */
    try {
        let response = await fetch(baseRestUrl, {
            method: 'GET',
            headers: headers
        });
        let json = await response.json();
        updateUI(json);
        let localTasks = await readLocalTodosFromIndexedDB();
        json.push(...localTasks);
        replaceTodosWithLatestState(json, startId);
    } catch (reason) {
        if (!navigator.onLine) {
            console.log("offline so loading from indexeddb");
            readTodosFromIndexedDB();
        }
        throw reason;
    }

}

async function replaceTodosWithLatestState(todos, startId) {
    let db = await dbPromise;
    let tx = db.transaction("todos", "readwrite");
    let store = tx.objectStore("todos");
    await store.clear();
    for (const todo of todos) {
        let id = todo.localKey ? todo.localKey : todo.id;
        if (!id) {
            id = ++startId;
        }
        store.add(todo, id);
    }
    return tx.done;
}

async function readLocalTodosFromIndexedDB() {
    let todosFromLocal = [];
    let db = await dbPromise;
    const tx = db.transaction("todos");
    for await (const cursor of tx.store.index("localKey")) {
        let todo = cursor.value;
        if (!todo.id) {
            todo.localKey = cursor.key;
        }
        todosFromLocal.push(todo);
    }
    updateUI(todosFromLocal);
    return todosFromLocal;
}

async function readTodosFromIndexedDB() {
    let db = await dbPromise;
    const tx = db.transaction("todos");
    let todosFromStore = [];
    for await (const cursor of tx.store) {
        let todo = cursor.value;
        if (!todo.id) {
            todo.localKey = cursor.key;
        }
        todosFromStore.push(todo);
    }
    debugger;

    await tx.done;
    console.log("done");
    if (todosFromStore.length !== 0) {
        updateUI(todosFromStore);
    }
}
