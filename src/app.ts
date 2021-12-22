//Select DOM
const nodes = {
	"todoListUL": 	   <HTMLUListElement>  document.querySelector("ul.todo-items"),
	"addTodoInput":    <HTMLInputElement>  document.querySelector(".todo-add>input"),
	"addTodoBtn": 	   <HTMLButtonElement> document.querySelector(".add-btn"),
	"totalItemsCount": <HTMLSpanElement>   document.querySelector(".todos-total>.output")
};

const dom = {
    feedback: <HTMLDivElement> document.querySelector('.feedback')
};

interface ITodo {
    _title: string;
    _completed: boolean;
    _id: number;
}

// Create todos array of type ITodo
let todos:ITodo[] = [];

class Todo implements ITodo {
    _title: string = "";
    _completed: boolean = false;
    _id: number = todos.length ? todos[todos.length-1]._id + 1 : 1;

    // Setters
    set title(title){ this._title = title; }
    set completed(completed){ this._completed = completed; }

    // Getters
    get title(): string { return this._title; }
    get completed(): boolean { return this._completed; }

    // setTimeOut for alerts
    static setTimeOutForAlerts(alertMessage: string, alertType: string, seconds: number): void {
        dom.feedback.innerText = alertMessage;
        dom.feedback.classList.add('showItem', 'alert-' + alertType);
        setTimeout(
            function() {
                dom.feedback.classList.remove('showItem', 'alert-' + alertType);
            }, seconds);
    }

    // Display the number of todo items
    static displayTodoItemsCount(): void {
        let count = (todos != null) ? todos.length : 0;
        nodes.totalItemsCount.innerText = count.toString();
    }

    // Render todos
    static renderTodos(): void {
        // Clean current todos:
        nodes.todoListUL.innerHTML = '';

        if(todos != null) {
            // Add Todo Item at the end
            todos.forEach( todo => {
                nodes.todoListUL.innerHTML += `
                <li data-id=${todo._id}>
                    <span class="${todo._completed?'completed':''}">${todo._title}</span>
                    <div class="action-icon complete"><i class="far fa-check-square"></i></div>
                    <div class="action-icon edit"><i class="fas fa-pencil-alt"></i></div>
                    <div class="action-icon remove"><i class="far fa-trash-alt"></i></div>
                </li>`;
            });
        }

        Todo.displayTodoItemsCount();
    }

    // Add Todo Item
    add(): void {
        // Get the input text
        const todoText = nodes.addTodoInput.value;

        // Make the ID - this should be done by the server
        const id = todos.length ? todos[todos.length-1]._id + 1 : 1;

        // Set the new item
        const newTodo:ITodo = {
            "_id": id,
            "_title": todoText,
            "_completed": false
        };

        // Check the index of todo from todos array
        let index = todos.findIndex(todo => todo._title === newTodo._title);
        
        if(newTodo._title == '') {
            Todo.setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
        }
        else if(newTodo != null && index == -1) {
            // Add new todo object to the end of todos array
            todos = [...todos, newTodo];

            Todo.setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
        }
        else {
            Todo.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
        }
        
        // Render todos
        Todo.renderTodos();

        // Clear input text
        nodes.addTodoInput.value = '';

        // Focus on input for new todo
        nodes.addTodoInput.focus();
    }

    // Remove Todo Item
    removeTodo(e: any): void {
        // Get id of todo to be removed
        let todoID: number;

        if(e.target.classList.contains("fa-trash-alt")) {
            todoID = +e.target.parentNode.parentNode.dataset.id;
        }

        // Get the index of todo to be removed from todos array
        let index = todos.findIndex(todo => todo._id === todoID);

        // Remove from todos array the element with index index
        if(index >= 0) {
            todos.splice(index, 1);
            Todo.setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
        }

        // Render todos
        Todo.renderTodos();
    }

    // Edit Todo Item
    editTodo(e: any): void {
        // Get id of todo to be edited
        let todoID: number;

        if(e.target.classList.contains("fa-pencil-alt")) {
            todoID = +e.target.parentNode.parentNode.dataset.id;
        }

        // Get the index of todo to be edited from todos array
        let index = todos.findIndex(todo => todo._id === todoID);

        // Make the todo editable
        let todo;
        if(index != -1) {
            todo = todos[index];
            const editValue: any = prompt("Edit the selected item", todo._title);
            todo._title = editValue;

            Todo.setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);

            // Render todos
            Todo.renderTodos();
        }
    }

    // Toggle completed/uncompleted Todo Item
    toggleComplete(e: any): void {
        // Get id of todo to be completed
        let todoID: number;

        if(e.target.classList.contains("fa-check-square")) {
            todoID = +e.target.parentNode.parentNode.dataset.id;
        }

        // Get the index of todo to be completed from todos array
        let index = todos.findIndex(todo => todo._id === todoID);
        
        // Toggle todo completed value
        let todo;
        if(index != -1) {
            todo = todos[index];
            todo._completed = (todo._completed == false) ? true : false;

            // Render todos
            Todo.renderTodos();
        }
    }
}

window.addEventListener( "DOMContentLoaded", event => {
    Todo.renderTodos();
});

// Add Todo Item on button click
nodes.addTodoBtn.addEventListener("click", () => {
    let todo = new Todo();
    todo.add();
});
// Add Todo Item on Enter key pressed
nodes.addTodoInput.addEventListener("keyup", function(e) {
    if(e.keyCode === 13) {
        let todo = new Todo();
        todo.add();
    }
});

// Remove Todo Item:
nodes.todoListUL.addEventListener("click", (e) => {
    let todo = new Todo();
    todo.removeTodo(e);
});

// Edit Todo Item
nodes.todoListUL.addEventListener("click", (e) => {
    let todo = new Todo();
    todo.editTodo(e);
});

// Toggle completed/uncompleted Todo Item
nodes.todoListUL.addEventListener("click", (e) => {
    let todo = new Todo();
    todo.toggleComplete(e);
});