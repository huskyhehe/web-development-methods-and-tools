"use strict";
(function () {
    
    const PAGES = {
        TODOS: 'todos',
        CAT: 'cat',
    };
    
    const state = {
        todos: [
            {
                task: "Sleep",
                done: false,
            },
            {
                task: "Eat",
                done: false,
            },
            {
                task: "Knock things off shelves",
                done: true,
            },
        ],
        page: PAGES.TODOS,
    };

    const appEl = document.querySelector('#app');    

    // const todosEl = document.querySelector("#todo-app .todos");
    appEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('todo')) {
            const index = e.target.dataset.index;
            state.todos[index].done = !state.todos[index].done;
            render();
            return;
        }

        if (e.target.classList.contains('to-delete')) {
            const index = e.target.dataset.index;
            state.todos.splice(index, 1);
            render();
            return;
        }

        if (e.target.classList.contains('page')) {
            console.log(state);
            state.page = e.target.dataset.target;
            render();
            return;
        }
    });


    // const addTaskFormEl = document.querySelector('.add-task');
    appEl.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskEl = document.querySelector('new-task');
        const task = taskEl.value;
        state.todos.push( {task, done: false} );
        taskEl.value = '';
        render();
        return;
    });


    render();
    
    function render() {
        if(state.page === PAGES.TODOS) {
            renderTodos();
            return;
        }
        if(state.page === PAGES.CAT) {
            renderCat();
            return;
        }
    }
    

    function renderTodos() {
        const listHtml = state.todos.map( (todo, index) => {
            const doneClass = todo.done ? "complete" : "";
            return `
                <li>
                    <span class="todo ${doneClass}" data-index="${index}">${todo.task}</span>
                    <button data-index="${index}" type="button" class="to-delete">X</button>
                </li>
            `;
        });
        appEl.innerHTML = `
            <ul class="todos">
                ${listHtml}
            </ul>
            <form action="" class="add-task">
                <label>
                    New Task
                    <input class="new-task">
                </label>
                <button type="submit">Add</button>
            </form>
            <button type="button" class="page" data-target="cat">Go to cat</button>
        `;
    }

    function renderCat() {
        appEl.innerHTML = `
            <img src="http://placekitten.com/300/300" alt="a random cat" />
            <button type="button" class="page" data-target="todos">Go to todos</button>
        `;
    }

})();