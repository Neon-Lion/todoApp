"use strict";

//Select DOM
const nodes = {
	"todoListUL": 	   document.querySelector("ul.todo-items"),
	"addTodoInput":    document.querySelector(".todo-add>input"),
	"addTodoBtn": 	   document.querySelector(".add-btn"),
	"totalItemsCount": document.querySelector(".todos-total>.output"),
	"feedback": 	   document.querySelector('.feedback')
};

const storage = {
	"localStorage": window.localStorage
}

// setTimeOut for alerts
function setTimeOutForAlerts(alertMessage, alertType, seconds) {
    nodes.feedback.innerText = alertMessage;
    nodes.feedback.classList.add('showItem', 'alert-' + alertType);
    setTimeout(
        function() {
            nodes.feedback.classList.remove('showItem', 'alert-' + alertType);
        }, seconds);
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: "base" }) === 0;
}

// Save todo tasks in localStorage
function saveLocalTodo(todo) {
    let todos;

	todos = (storage.localStorage.getItem("todos") === null) ? [] :
		JSON.parse(storage.localStorage.getItem("todos"));

	todos = [...todos, todo];
    storage.localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove todo task
function removeLocalTodo(todoIndex) {
    let todos;

    todos = (storage.localStorage.getItem("todos") === null) ? [] :
		JSON.parse(storage.localStorage.getItem("todos"));
    
    todos.splice(todoIndex, 1);
    storage.localStorage.setItem("todos", JSON.stringify(todos));
}

// Display the number of todo items
const displayTodoItemsCount = function() {
	let todos;
	
	// Get all items from the localStorage
	todos = (storage.localStorage.getItem("todos") === null) ? [] :
		JSON.parse(storage.localStorage.getItem("todos"));

	let count = todos.length || 0;
	nodes.totalItemsCount.innerText = count;
};

// Render todos
const renderTodos = function(e) {
	// Clean current todos:
	nodes.todoListUL.innerHTML = '';

	let todos;

	// Get all items from the localStorage if there are any
	todos = (storage.localStorage.getItem("todos") === null) ? [] :
		JSON.parse(storage.localStorage.getItem("todos"));

	// Add Todo Item at the end
	todos.forEach( todo => {
        nodes.todoListUL.innerHTML += `
        <li data-id=${todo.id}>
            <span class="${todo.completed?'completed':''}">${todo.title}</span>
            <div class="action-icon complete"><i class="far fa-check-square"></i></div>
            <div class="action-icon edit"><i class="fas fa-pencil-alt"></i></div>
            <div class="action-icon remove"><i class="far fa-trash-alt"></i></div>
        </li>`;
	});

	displayTodoItemsCount();
};

// Add Todo Item
const addTodo = function() {
	// Get the input value
	const todoText = nodes.addTodoInput.value;

	let todos;
	
	// Get all items from the localStorage
	todos = (storage.localStorage.getItem("todos") === null) ? [] :
		JSON.parse(storage.localStorage.getItem("todos"));

	// Set the id of the item
	const id = todos.length ? todos[todos.length-1].id + 1 : 1;

	const newTodo = {
		"id": id,
		"title": todoText,
		"completed": false
	};

	let index, hasValue;
	
	// Check for todo item with the same title as input value ignoring lowercase and uppercase letters
	if(todos != null)
    {	
        for (let i = 0; i < todos.length; i++) {
            if(equalsIgnoringCase(todos[i].title, newTodo.title)) {
                hasValue = true;
                break;
            }
            else {
                hasValue = false;
            }
        }
    }

	// Validate input value
	if(newTodo.title == '') {
		setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
	}
	else if(newTodo != '' && hasValue == true) {
		setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
	}
	else {
		// Add new todo in localStorage
		saveLocalTodo(newTodo);

		setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
	}
	
	// Render todos
	renderTodos();

	// Clear input text
	nodes.addTodoInput.value = '';

	// Focus on input for new todo
	nodes.addTodoInput.focus();
};

// Remove Todo Item
const removeTodo = function(id) {
	let todos;
	
	// Get all items from the localStorage
	todos = JSON.parse(storage.localStorage.getItem("todos"));

	// Get the index of todo to be removed from todos key in localStorage
	let index = todos.findIndex(todo => todo.id === id);

	// Remove from todos array the element with index index
	if(index >= 0) {
		removeLocalTodo(index);
		setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
	}

	// Render todos
	renderTodos();
};

// Edit Todo Item
const editTodo = function (id) {
	let todos;
	
	// Get all items from the localStorage
	todos = JSON.parse(storage.localStorage.getItem("todos"));

	// Get the index of todo to be edited from todos key in localStorage
	let index = todos.findIndex(todo => todo.id === id);

	let todo;

	// Make the todo item editable
	if(index != -1) {
		todo = todos[index];
		const editValue = prompt("Edit the selected item", todo.title);
		todo.title = editValue;

		storage.localStorage.setItem("todos", JSON.stringify(todos));

		setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);

		// Render todos
		renderTodos();
	}
}

// Toggle completed/uncompleted Todo Item
const toggleComplete = function(id) {
	let todos;
	
	// Get all items from the localStorage
	todos = JSON.parse(storage.localStorage.getItem("todos"));

	// Get the index of todo to be completed/uncompleted from todos key in localStorage
	let index = todos.findIndex(todo => todo.id === id);

	let todo;

	if(index != -1) {
		todo = todos[index];

		// Make the todo completed/uncompleted
		todo.completed = !todo.completed;

		storage.localStorage.setItem("todos", JSON.stringify(todos));

		// Render todos
		renderTodos();
	}
};

window.addEventListener( "DOMContentLoaded", event => { renderTodos() } );

// Add Todo Item on button click
nodes.addTodoBtn.addEventListener("click", addTodo);
// Add Todo Item on Enter key pressed
nodes.addTodoInput.addEventListener("keyup", function(e) {
	if(e.keyCode === 13) {
		addTodo();
	}
});

// Remove, Edit and Toggle completed/uncompleted Todo Item
nodes.todoListUL.addEventListener("click", function (e) {
	// Remove Todo Item
	if(e.target.classList.contains("fa-trash-alt")){
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;

		removeTodo(id);
	}
	// Toggle completed/uncompleted Todo Item
	else if(e.target.classList.contains("fa-check-square")){
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;

		toggleComplete(id);
	}
	// Edit Todo Item
	else if(e.target.classList.contains("fa-pencil-alt")) {
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;
		
		editTodo(id);
	}
	else {
		e.preventDefault()
	}
})