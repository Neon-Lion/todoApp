"use strict";

//Select DOM
const nodes = {
	"todoListUL": 	   document.querySelector("ul.todo-items"),
	"addTodoInput":    document.querySelector(".todo-add>input"),
	"addTodoBtn": 	   document.querySelector(".add-btn"),
	"totalItemsCount": document.querySelector(".todos-total>.output")
}

const dom = {
    feedback: document.querySelector('.feedback')
};

// Create todos array of todo objects from LocalStorage data
let todos = [];

// setTimeOut for alerts
function setTimeOutForAlerts(alertMessage, alertType, seconds) {
    dom.feedback.innerText = alertMessage;
    dom.feedback.classList.add('showItem', 'alert-' + alertType);
    setTimeout(
        function() {
            dom.feedback.classList.remove('showItem', 'alert-' + alertType);
        }, seconds);
}

// Display the number of tasks
const displayTodoItemsCount = function() {
	let count = todos.length || 0;
	nodes.totalItemsCount.innerText = count;
};

// Creating new task list item
const renderTodos = function(e) {
	// Clean current todos:
	nodes.todoListUL.innerHTML = '';

	// Add Todo Item at the end
	todos.forEach( todo => {
        nodes.todoListUL.innerHTML += `
        <li data-id=${todo.id}>
            <span class="${todo.completed?'completed':''}">${todo.title}</span>
            <div class="action-icon complete"><i class="far fa-check-square"></i></div>
            <div class="action-icon edit"><i class="fas fa-pencil-alt"></i></div>
            <div class="action-icon remove"><i class="far fa-trash-alt"></i></div>
        </li>`;
	})

	displayTodoItemsCount();
};

// Add Todo Task
const addTodo = function() {
	// Get the input text
	const todoText = nodes.addTodoInput.value;

	// Make the ID - this should be done by the server
	const id = todos.length ? todos[todos.length-1].id + 1 : 1;

	const newTodo = {
		"id": id,
		"title": todoText,
		"completed": false
	};

	// Get the index of todo to be completed from todos array
	let index = todos.findIndex(todo => todo.title === newTodo.title);

	if(newTodo.title == '') {
		setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
	}
	else if(newTodo != '' && index == -1) {
		// Add new todo object to the end of todos array
		todos = [...todos, newTodo];

		setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
	}
	else {
		setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
	}
	
	// Render todos
	renderTodos();

	// clear input text
	nodes.addTodoInput.value = '';

	// focus on input for new todo
	nodes.addTodoInput.focus();
};

// Remove Todo Task
const removeTodo = function(id) {
	// Get the index of todo to be removed from todos array
	let index = todos.findIndex(todo => todo.id === id);

	// Remove from todos array the element with index index
	if(index >= 0) {
		todos.splice(index, 1);
		setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
	}

	// Render todos
	renderTodos();
};

// Edit Todo Task
const editTodo = function (id) {
	// Get the index of todo to be edited from todos array
	let index = todos.findIndex(todo => todo.id === id);

	// Make the todo editable
	let todo;
	if(index != -1) {
		todo = todos[index];
		const editValue = prompt("Edit the selected item", todo.title);
		todo.title = editValue;

		setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);

		// Render todos
		renderTodos();
	}
}

// Complete Todo Task
const toggleComplete = function(id) {
	// Get the index of todo to be completed from todos array
	let index = todos.findIndex(todo => todo.id === id);

	// Make the todo completed
	let todo;
	if(index != -1) {
		todo = todos[index];
		todo.completed = (todo.completed == false) ? true : false;

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

// Remove, Edit and Complete Todo Item
nodes.todoListUL.addEventListener("click", function (e) {
	// Remove Todo Item
	if(e.target.classList.contains("fa-trash-alt")){
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;

		removeTodo(id)
	}
	// Complete Todo Item
	else if(e.target.classList.contains("fa-check-square")){
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;

		toggleComplete(id)
	}
	else if(e.target.classList.contains("fa-pencil-alt")) {
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;
		
		editTodo(id)
	}
	else{
		e.preventDefault()
	}
})