import { openDb, deleteDb } from 'idb';


export default function () {

    /**
     * Encode less-than and ampersand characters with entity codes to make user-
     * provided text safe to parse as HTML.
     *
     * @param {string} s String to escape
     *
     * @returns {string} String with unsafe characters escaped with entity codes
     */
    const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');

    //check for support
    if (('indexedDB' in window)) {
        var dbPromise = openDb('pwa-test-db', 1, (upgradeDb) => {
            if (!upgradeDb.objectStoreNames.contains('todos')) {
                var todosOS = upgradeDb.createObjectStore('todos', { autoIncrement: true });
                // todosOS.createIndex('text', 'text', { unique: false });
            }
        });
        const newTodo = document.querySelector(".new-todo");
        const todoList = document.querySelector(".todo-list");
        newTodo.addEventListener('change', ({ target }) => {
            const value = target.value.trim();
            newTodo.value = '';
            console.log("adding todo?", value);
            dbPromise.then((db) => {
                var tx = db.transaction('todos', 'readwrite');
                var store = tx.objectStore('todos');
                var todo = {
                    title: value,
                    created: new Date().getTime(),
                    completed: false
                };
                store.add(todo).then(key => {
                    todoList.innerHTML = 
                    `<li data-id="${key}"${todo.completed ? ' class="completed"' : ''}>
                        <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                        <label>${escapeForHTML(todo.title)}</label>
                        <button class="destroy"></button>
                    </li>` + todoList.innerHTML;
                });
                return tx.complete;
            }).then(() => {
                console.log("Added a note to the store");
            });
        });
        dbPromise.then(db => {
            const tx = db.transaction('todos');
            let todos = '';
            tx.objectStore('todos').iterateCursor(cursor => {
                if (!cursor) return;
                console.log(cursor.value);
                todos +=
                    `<li data-id="${cursor.key}"${cursor.value.completed ? ' class="completed"' : ''}>
                        <input class="toggle" type="checkbox" ${cursor.value.completed ? 'checked' : ''}>
                        <label>${escapeForHTML(cursor.value.title)}</label>
                        <button class="destroy"></button>
                    </li>`;
                cursor.continue();
            });

            tx.complete.then(() => {
                console.log('done');
                if (todos !== '') {
                    todoList.innerHTML = todos;
                    todoList.parentElement.style.display = "block";
                }
            });
        });
        // dbPromise.then((db) => {
        //     var tx = db.transaction('store', 'readwrite');
        //     var store = tx.objectStore('store');
        //     var item = {
        //       name: 'sandwich',
        //       price: 4.99,
        //       description: 'A very tasty sandwich',
        //       created: new Date().getTime()
        //     };
        //     store.add(item);
        //     return tx.complete;
        //   }).then(function() {
        //     console.log('added item to the store os!');
        //   });
    }
}