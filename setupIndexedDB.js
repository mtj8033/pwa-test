import { openDb, deleteDb } from "idb";
import uuid from "uuid/v4";
import escapeHTML from "escape-html";

const dbPromise = setupIndexedDB();
const addNewTodoElement = document.querySelector(".new-todo");
const todoListElement = document.querySelector(".todo-list");
const headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
const baseRestUrl = "http://jsonplaceholder.typicode.com/todos";

handleAddTodo();
handleRemoveTodo();
readTodos();

export function setupIndexedDB() {
    //check for support of indexeddb
    if (("indexedDB" in window)) {
        return openDb("pwa-test-db", 1, (upgradeDb) => {
            if (!upgradeDb.objectStoreNames.contains("todos")) {
                let todosOS = upgradeDb.createObjectStore("todos");
                // todosOS.createIndex("text", "text", { unique: false });
            }
        });
    } else {
        return null;
    }
}


function handleAddTodo() {
    /** 
     * 
Add flow:
1a. Attempt to add to server
	a. If successful, update in indexed with the updated info (primary key)
	b. if unsuccessful and offline, notify user it was unsuccessful and they are working offline - display todo from indexeddb
1b. Store it in indexeddb with a uuid
     * 
     */
    addNewTodoElement.addEventListener("change", ({ target }) => {
        const value = target.value.trim();
        addNewTodoElement.value = "";
        console.log("adding todo?", value);

        let todo = {
            userId: 1,
            title: value,
            completed: false
        };

        const id = uuid();

        fetch(baseRestUrl, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: headers
        })
            .then(response => response.json())
            .then(json => {
                updateUI([json]);
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
        writeTodoToLocal(todo, id);
    });
}

function replaceTodosWithLatestState(todos) {
    dbPromise.then((db) => {
        let tx = db.transaction("todos", "readwrite");
        let store = tx.objectStore("todos");
        store.clear().then(() => {
            todos.forEach(todo => {
                const id = uuid();
                store.add(todo, id);
            });
        });
        return tx.complete;
    });
}

function writeTodoToLocal(todo, uuid) {
    dbPromise.then((db) => {
        let tx = db.transaction("todos", "readwrite");
        let store = tx.objectStore("todos");
        store.add(todo, uuid);
        return tx.complete;
    }).then(() => {
        console.log("Added a todo to the store", uuid);
    });
}

function updateTodoInLocal(todo, uuid) {
    dbPromise.then((db) => {
        let tx = db.transaction("todos", "readwrite");
        let store = tx.objectStore("todos");
        store.put(todo, uuid);
        return tx.complete;
    }).then(() => {
        console.log("Added a todo to the store", uuid);
    });
}

function updateUI(todos) {
    todos.forEach(todo => {
        const todoToAdd =
            `<li data-id="${todo.id ? todo.id : todo.localKey}"${todo.completed ? ' class="completed"' : ""}>
                <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
                <label>${escapeHTML(todo.title)}</label>
                <button class="destroy"></button>
            </li>`;
        todoListElement.insertAdjacentHTML("afterbegin", todoToAdd);
    });
    todoListElement.parentElement.style.display = "block";
}

function handleRemoveTodo() {
    /** 
     * 

Remove flow:
1a. Attempt to remove from server
	a. if successful, ?
	b. if unsuccessful and offline, notify user
1b. Remove it in indexeddb
     */
    todoListElement.addEventListener("click", ({ target }) => {
        if (target.classList.contains("destroy")) {
            const todoElement = target.parentElement;
            dbPromise.then(db => {
                let tx = db.transaction("todos", "readwrite");
                let store = tx.objectStore("todos");
                store.delete(Number(todoElement.getAttribute("data-id"))).then(() => {
                    todoListElement.removeChild(todoElement);
                    if (todoListElement.children.length === 0) {
                        todoListElement.parentElement.style.display = "none";
                    }
                });
                return tx.complete;
            }).then(() => {
                console.log("deleted a todo from the store");
            });
        }
    });
}

function readTodos() {
    /**Load flow:
1. Attempt to load from network
	1a. If successful then store into indexeddb and display
	1b. if unsuccessful and offline then retrieve from indexeddb and display, note to user that they are working offline
 */
    fetch(baseRestUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(json => {
            updateUI(json);
            replaceTodosWithLatestState(json);
        }).catch((reason) => {
            if (!navigator.onLine) {
                console.log("offline so loading from indexeddb");
                readTodosFromIndexedDB();
            }
            throw reason;
        });

}

function readTodosFromIndexedDB() {
    dbPromise.then(db => {
        const tx = db.transaction("todos");
        let todos = "";
        tx.objectStore("todos").iterateCursor(null, "prev", cursor => {
            if (!cursor) return;
            let todo = cursor.value;
            if (!todo.id) {
                todo.localKey = cursor.key;
            }
            updateUI([todo]);
            cursor.continue();
        });

        tx.complete.then(() => {
            console.log("done");
            if (todos !== "") {
                todoListElement.innerHTML = todos;
                todoListElement.parentElement.style.display = "block";
            }
        });
    });
}