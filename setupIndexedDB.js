import { openDB, deleteDB } from "idb/with-async-ittr.js";
import uuid from "uuid/v4";
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
        return openDB("pwa-test-db", 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                console.log(oldVersion);
                console.log(transaction);
                if (!db.objectStoreNames.contains("todos")) {
                    let todosOS = db.createObjectStore("todos");
                    // todosOS.createIndex("text", "text", { unique: false });
                }
            },
        });
    } else {
        return null;
    }
}


function handleAddTodo() {
    /** 
     * Add flow:
     * 1a. Attempt to add to server
     *      a. If successful, update in indexed with the updated info (primary key)
     *      b. if unsuccessful and offline, notify user it was unsuccessful and they are working offline - display todo from indexeddb
     * 1b. Store it in indexeddb with a uuid
     * 
     */
    addNewTodoElement.addEventListener("change", async ({ target }) => {
        const value = target.value.trim();
        addNewTodoElement.value = "";
        console.log("adding todo?", value);

        const id = uuid();

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
                //         updateUI([todo]);
                //     }
                //     throw reason;

            });
        //always write to local just in case
        updateUI([todo]);
        writeTodoToLocal(todo, id);
    });
}

async function replaceTodosWithLatestState(todos) {
    let db = await dbPromise;
    let tx = db.transaction("todos", "readwrite");
    let store = tx.objectStore("todos");
    await store.clear();
    todos.forEach(todo => {
        const id = uuid();
        store.add(todo, id);
    });
    return tx.done;
}

async function writeTodoToLocal(todo, uuid) {
    let db = await dbPromise;
    let tx = db.transaction("todos", "readwrite");
    let store = tx.objectStore("todos");
    store.add(todo, uuid);
    await tx.done;
    console.log("Added a todo to the store", uuid);
}

async function updateTodoInLocal(todo, uuid) {
    let db = await dbPromise;
    let tx = db.transaction("todos", "readwrite");
    let store = tx.objectStore("todos");
    store.put(todo, uuid);
    await tx.done;
    console.log("Added a todo to the store", uuid);
}

function updateUI(todos, uuid) {
    todos.forEach(todo => {
        if (uuid) {
            const existing = document.querySelector(`li[data-id="${uuid}"]`);
            if (existing) {
                existing.remove();
            }
        }
        const todoToAdd =
            `<li data-id="${todo.id ? todo.id : todo.localKey}" ${todo.completed ? ' class="completed"' : ""}>
                <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
                <label>${escapeHTML(todo.title)}</label>
                <button ${todo.saved ? ' class="saved"' : todo.localKey ? ' class="local"' : ""}></button>
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
            await store.delete(Number(todoElement.getAttribute("data-id")));

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
    /**
     * Load flow:
     * 1. Attempt to load from network
     *      1a. If successful then store into indexeddb and display
     *      1b. if unsuccessful and offline then retrieve from indexeddb and display, note to user that they are working offline
     */
    /** 
     * Load flow:
     * 
     * 1. Read unsaved from indexeddb
     * 2. Read all saved local from indexeddb (wouldn't do this if you had a real backend api to call/save)
     * 3. Read all non-local from 
     */
    try {
        let response = await fetch(baseRestUrl, {
            method: 'GET',
            headers: headers
        });
        let json = await response.json();
        updateUI(json);
        replaceTodosWithLatestState(json);
    } catch (reason) {
        if (!navigator.onLine) {
            console.log("offline so loading from indexeddb");
            readTodosFromIndexedDB();
        }
        throw reason;
    }

}

async function readTodosFromIndexedDB() {
    let db = await dbPromise;
    const tx = db.transaction("todos");
    let todos = "";
    for await (const cursor of tx.store) {
        if (!cursor) return;
        let todo = cursor.value;
        if (!todo.id) {
            todo.localKey = cursor.key;
        }
        updateUI([todo]);
        cursor.continue();
    }

    await tx.done;
    console.log("done");
    if (todos !== "") {
        todoListElement.innerHTML = todos;
        todoListElement.parentElement.style.display = "block";
    }
}