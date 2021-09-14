// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions
function addTodo (event) {
    event.preventDefault();
    saveLocalTodos(todoInput.value);
    todoList.appendChild(todoElement(todoInput.value));
    todoInput.value = '';
}

function todoElement (text) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = text;
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);

    // const todoDiv = 
    // `<div class="todo">
    //     <li class="todo-item">123</li>
    //     <i class="fas fa-check complete-btn"></i>
    //     <i class="fas fa-trash trash-btn"></i>
    // </div>`;
    return todoDiv;
}

function deleteCheck (event) {
    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        todo.classList.add('fall');
        removeLocalTodos(todo.children[0].innerText);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo (event) {
    const todos = todoList.childNodes;

    todos.forEach((todo) => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos (todo) {
    let todos;
    // check
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // add a todo to the array
    todos.push(todo);
    // save to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
    let todos;
    // check
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        todoList.appendChild(todoElement(todo));
    })
}

function removeLocalTodos (todo) {
    let todos;
    // check
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex, 1);
    // save to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}