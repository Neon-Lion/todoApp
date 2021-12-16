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
            <div class="action-icon complete"><i class="far fa-check-square"></i></div>
            <div class="action-icon edit"><i class="fas fa-pencil-alt"></i></div>
            <div class="action-icon remove"><i class="far fa-trash-alt"></i></div>
        </li>`;
	});

	displayTodoItemsCount();
};

// Fetch the Render todos
const fetchAndRenderTodos = function (APIRoot) {
	fetch(APIRoot)
	.then(response => {
		if(response.ok) {
			return response.json();
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
	
	// Create a new POST Request object
	let postTodos = new Request(APIRoot,
	{
		method: 'POST',
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(newTodo)
	});

	// Add todo when todos array is empty
	if(todos == "" && newTodo.title != '') {
		// Send the POST Request object
		fetch(postTodos)
		.then(response => {
			if(!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
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
	else if(todos != "") {
		todos.forEach( todo => {
			// Get the index of todo to be edited from todos array
			let index = todos.findIndex(todo => todo.title === newTodo.title);

			if(newTodo.title == '') {
				setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
			}
			else if(newTodo.title != '' && index == -1) {
				// Fetch the POST Request object
				fetch(postTodos)
				.then(response => {
					if(!response.ok) {
						throw Error(response.statusText);
					}

					return response.json();
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
			}
		});
	}
	else {
		setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
	}
};

// Remove Todo Item
const removeTodo = function(id) {
	// Create a new DELETE Request object
	let deleteTodos = new Request(`${APIRoot}/${id}`,
	{
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		}
	});

	// Send the DELETE Request object
	fetch(deleteTodos)
	.then( response => {
		if(!response.ok) {
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
		let editTodo = new Request(`${APIRoot}/${id}`,
		{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: `${todo.title}`,
				completed: todo.completed
			})
		});

		// Send the PUT Request object
		fetch(editTodo)
		.then(response => {
			if(!response.ok) {
				throw Error(response.statusText);
			}

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

	// Create a new PATCH Request object
	let completeTodo = new Request(`${APIRoot}/${id}`,
	{
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify({
			completed: todo.completed
		})
	});

	// Send the PATCH Request object
	fetch(completeTodo)
	.then(response => {
		if(!response.ok) {
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
	if(e.target.classList.contains("fa-trash-alt")){
		const li = e.target.parentElement.parentElement
		const id = li.dataset.id*1;

		removeTodo(id);
	}
	// Remove, Edit and Toggle completed/uncompleted Todo Item
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
		e.preventDefault();
	}
});