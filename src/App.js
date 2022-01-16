// import logo from './logo.svg';
// import './App.css';

import React, { Component } from "react";
import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";

class App extends Component {
    constructor(props) {
        super(props);

        this.APIRoot  = "http://localhost:3001/todos";
        
        this.state = {
            todos: [],
            alertMessage: "",
            alertType: "",
            showItem: false,
            alertClass: ""
        };

        this.setTimeOutForAlerts = this.setTimeOutForAlerts.bind(this);
        this.fetchTodos = this.fetchTodos.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    // setTimeOut for alerts
    setTimeOutForAlerts(alertMessage, alertType, seconds) {
        // Change local state
        this.setState({
            "alertMessage": alertMessage,
            "alertType": alertType,
            "showItem": true,
            "alertClass": `showItem alert-${alertType}`
        })

        setTimeout(
            () => {
                // Change local state
                this.setState({
                    "alertMessage": "",
                    "alertType": "",
                    "showItem": false,
                    "alertClass": ""
                })
            }, seconds);
    }

    fetchTodos() {
        fetch(this.APIRoot)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(data => {
            // Change local state
            this.setState({
                "todos": data
            })
        })
        .catch(err => console.error(err));
    }

    // Add Todo Item
    addTodo(todoTitle) {
        let newTodo = {
            "title": todoTitle,
            "completed": false
        }

        let hasValue = false;

        if(this.state.todos !== "") {
            for (let i = 0; i < this.state.todos.length; i++) {	
                if(this.state.todos[i].title.toLocaleLowerCase() === newTodo.title.toLocaleLowerCase()) {
                    hasValue = true;

                    break;
                }
                else {
                    hasValue = false;
                }
            }
        }

        if(newTodo.title === '') {
            this.setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
        }
        else if(newTodo.title !== '' && hasValue === false) {
            // Create a new POST Request object
            let postTodos = new Request(this.APIRoot,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(newTodo)
            });
        
            fetch(postTodos)
            .then(response => {
                if(!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then(data => {
                // Change local state
                this.setState({
                    "todos": [...this.state.todos, data]
                })
                
                this.setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
            })
            .catch(err => console.error(err));
        }
        else {
            this.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
        }
    }

    // Remove Todo Item
    removeTodo(id) {
        // Create a new DELETE Request object
        let deleteTodo = new Request(`${this.APIRoot}/${id}`,
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Send the DELETE Request object
        fetch(deleteTodo)
        .then( response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }

            // Remove from todos array the element with selected id using filter()
            this.setState({
                "todos": this.state.todos.filter(todo => todo.id !== id)
            })

            this.setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
        })
        .catch(err => console.error(err));
    };

    // Edit Todo Item
    editTodo(id) {
        // Get the index of todo to be edited from todos array
        let index = this.state.todos.findIndex(todo => todo.id === id);

        if(index !== -1) {
            let todo = this.state.todos[index];
            const editValue = prompt("Edit the selected item", todo.title);
            todo.title = editValue;

            // Create a new PUT Request object
            let editTodo = new Request(`${this.APIRoot}/${id}`,
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
                else {
                    // this.fetchTodos();
                    let newTodos = this.state.todos.map( todo => 
                        todo.id === id ? {"title": todo.title, "completed": todo.completed, "id": todo.id} : todo
                    )

                    this.setState({
                        "todos": newTodos
                    })
                }

                this.setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);
            })
            .catch(err => console.error(err));
        }
    }

    // Toggle completed/uncompleted Todo Item
    toggleComplete(id) {
        // Get todo to be completed/uncompleted from todos array
        let todo = this.state.todos.filter(todo => todo.id === id)[0];
        
        todo.completed = !todo.completed;

        // Create a new PATCH Request object
        let completeTodo = new Request(`${this.APIRoot}/${id}`,
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
            else {
                let newTodos = this.state.todos.map( todo => 
                    todo.id === id ? {"title": todo.title, "completed": todo.completed, "id": todo.id} : todo
                )

                this.setState({
                    "todos": newTodos
                })
            }
        })
        .catch(err => console.error(err));
    };

    render() {
        return (
            // <div className="App">
            //     <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <p>
            //         Edit <code>src/App.js</code> and save to reload.
            //     </p>
            //     <a
            //         className="App-link"
            //         href="https://reactjs.org"
            //         target="_blank"
            //         rel="noopener noreferrer"
            //     >
            //         Learn React
            //     </a>
            //     </header>
            // </div>
            
            <div className="page">
                <Header />
                <main className="todo-app">
                    <AddTodo
                        addTodo      = {this.addTodo}
                        addAlertType = {this.addAlertType}
                        alertClass   = {this.state.alertClass}
                        alertMessage = {this.state.alertMessage}
                        fetchTodos   = {this.fetchTodos}
                    />
                    <TodoList todos = {this.state.todos} toggleComplete = {this.toggleComplete} editTodo = {this.editTodo} removeTodo = {this.removeTodo} />
                    <TodosCount todos = {this.state.todos} />
                </main>
            </div>
        );
    }
}

export default App;