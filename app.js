"use strict";

//Select DOM
const nodes = {
	"todoListUL": 	   document.querySelector("ul.todo-items"),
	"addTodoInput":    document.querySelector(".todo-add>input"),
	"addTodoBtn": 	   document.querySelector(".add-btn"),
	"totalItemsCount": document.querySelector(".todos-total>.output"),
	"feedback": 	   document.querySelector('.feedback')
};

const APIRoot = "http://localhost:3000/todos";

// Create todos array of todo objects from localStorage data
let todos = [];

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

// Display the number of todo items
const displayTodoItemsCount = function() {
	let count = todos.length || 0;
	nodes.totalItemsCount.innerText = count;
};

// Render todos
const renderTodos = function(todos) {
	// Clean current todos:
	nodes.todoListUL.innerHTML = '';

	// Add Todo Item at the end
	todos.forEach( todo => {
        nodes.todoListUL.innerHTML += `
        <li data-id=${todo.id}>
			<span class="${todo.completed?'completed':''}">${todo.title}</span>
			<div class="action-icon remove"><i class="far fa-trash-alt"></i></div>
			<div class="action-icon edit"><i class="fas fa-pencil-alt"></i></div>
            <div class="action-icon complete"><i class="far ${todo.completed ? 'fa-check-square' : 'fa-square'}"></i></div>
        </li>`;
	});

	displayTodoItemsCount();
};

// Fetch the Render todos
const fetchAndRenderTodos = function (APIRoot) {
	axios.get(APIRoot)
	.then(response => {
		if(response.status) {
			return response.data;
		}
	})
	.then(data => {
		todos = data;
		renderTodos(todos);
	})
	.catch(err => console.error(err));
}

// Clear input field and focus on it for new todo
const clearInput = function () {
	// Clear input text
	nodes.addTodoInput.value = '';

	// Focus on input for new todo
	nodes.addTodoInput.focus();
}

// Add Todo Item
const addTodo = function() {
	// Get the input value
	const todoText = nodes.addTodoInput.value;

	// Set the new item
	const newTodo = {
		"title": todoText,
		"completed": false
	};

	let hasValue;

	if(todos != "") {
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

	if(newTodo.title == '') {
		setTimeOutForAlerts("Please enter valid value.", "danger", 3000);

		clearInput();
	}
	else if(newTodo.title != '' && hasValue == false) {
		// Send the POST Request object
		axios.post(APIRoot, newTodo)
		.then(response => {
			if(!response.status) {
				throw Error(response.statusText);
			}

			return response.data;
		})
		.then(data => {
			// Change local state
			todos = [...todos, data];
			
			setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
	
			// Render todos
			renderTodos(todos);

			clearInput();
		})
		.catch(err => console.error(err));
	}
	else {
		setTimeOutForAlerts("There is an item with that value.", "danger", 3000);

		clearInput();
	}
};

// Remove Todo Item
const removeTodo = function(id) {
	// Send the DELETE Request object
	axios.delete(`${APIRoot}/${id}`)
	.then( response => {
		if(!response.status) {
			throw Error(response.statusText);
		}

		// Remove from todos array the element with selected id using filter()
		todos = todos.filter(todo => todo.id != id);

		setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
		
		// Render todos
		renderTodos(todos);
	})
	.catch(err => console.error(err));
};

// Edit Todo Item
const editTodo = function (id) {
	// Get the index of todo to be edited from todos array
	let index = todos.findIndex(todo => todo.id === id);

	if(index != -1) {
		let todo = todos[index];
		const editValue = prompt("Edit the selected item", todo.title);
		todo.title = editValue;

		// Create a new PUT Request object
		const editedTodo = {
			title: `${todo.title}`,
			completed: todo.completed
		};

		// Send the PUT Request object
		axios.put(`${APIRoot}/${id}`, editedTodo)
		.then(response => {
			if(!response.status) {
				throw Error(response.statusText);
			}

			setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);

			// Render todos
			renderTodos(todos);
		})
		.catch(err => console.error(err));
	}
}

// Toggle completed/uncompleted Todo Item
const toggleComplete = function(id) {
	// Get todo to be completed/uncompleted from todos array
	let todo = todos.filter(todo => todo.id === id)[0];
	
	todo.completed = !todo.completed;

	// Send the PATCH Request object
	axios.patch(`${APIRoot}/${id}`, {
		completed: todo.completed
	})
	.then(response => {
		if(!response.status) {
			throw Error(response.statusText);
		}

		// Render todos
		renderTodos(todos);
	})
	.catch(err => console.error(err));
};

window.addEventListener( "DOMContentLoaded", () => { fetchAndRenderTodos(APIRoot) } );

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
	if(e.target.classList.contains("fa-trash-alt")) {
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;

		removeTodo(id);
	}
	// Remove, Edit and Toggle completed/uncompleted Todo Item
	else if(e.target.classList.contains("fa-square") || e.target.classList.contains("fa-check-square")) {
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
		e.preventDefault();
	}
});