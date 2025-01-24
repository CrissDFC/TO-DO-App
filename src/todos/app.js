import html from './app.html?raw';
import todoStore, {Filters} from "../store/todo.store.js";
import {renderTodos, renderPending} from "./use-casses/index.js";


const elementIDs = {
    ClearCompleted: ".clear-completed",
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 *
 * @param {String} elementId
 * @constructor
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCountLabel);
    }

    (() => {

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();


    // Referencias HTML
    const newDescriptionInput =  document.querySelector(elementIDs.NewTodoInput);
    const todoListUL = document.querySelector(elementIDs.TodoList);
    const clearCompletedButton = document.querySelector(elementIDs.ClearCompleted);
    const filtersUL = document.querySelectorAll(elementIDs.TodoFilters)

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);

        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event ) => {
        if(event.target.getAttribute('class') === 'destroy') {
            const element = event.target.closest('[data-id]');
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });

    clearCompletedButton.addEventListener('click', ()=>{
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersUL.forEach( element  => {

        element.addEventListener('click', (element) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case  'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case  'Pendientes':
                todoStore.setFilter(Filters.Pending)
                break;
                case  'Completados':
                todoStore.setFilter(Filters.Completed)
                break;
            }
            displayTodos();
        });
    });

};