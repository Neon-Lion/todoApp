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

        this.APIRoot = "http://localhost:3001/todos";
        
        this.state = {
            todos: [],
            hasValue: false,
            alertMessage: "",
            alertType: "",
            showItem: false,
            alertClass: ""
        };

        this.onClickHandler = this.onClickHandler.bind(this);
        this.fetchTodos = this.fetchTodos.bind(this);
        this.addAlertType = this.addAlertType.bind(this);
        this.setTimeOutForAlerts = this.setTimeOutForAlerts.bind(this);
    }

    addAlertType() {
        if(this.state.showItem) {
            // Change local state
            this.setState({
                "todos": this.state.todos,
                "hasValue": this.state.hasValue,
                "alertMessage": this.state.alertMessage,
                "alertType": this.state.alertType,
                "showItem": true,
                "alertClass": 'showItem alert-' + this.state.alertType
            })
        }
    }

    // setTimeOut for alerts
    setTimeOutForAlerts(alertMessage, alertType, seconds) {
        // alert(alertType);
        
        // Change local state
        this.setState({
            "todos": this.state.todos,
            "hasValue": this.state.hasValue,
            "alertMessage": alertMessage,
            "alertType": alertType,
            "showItem": true,
            "alertClass": `showItem alert-${alertType}`
        })

        this.addAlertType();

        setTimeout(
            () => {
                // Change local state
                this.setState({
                    "todos": this.state.todos,
                    "hasValue": this.state.hasValue,
                    "alertMessage": "",
                    "alertType": "",
                    "showItem": false,
                    "alertClass": ""
                })
            }, seconds);
    }

    fetchTodos() {
        fetch(this.APIRoot)
        .then(r => {
            if(r.ok) {
                return r.json();
            }
        })
        .then(data => {
            // Change local state
            this.setState({
                "todos": data
            })
        })
        .catch(err => console.warn(err))
    }

    onClickHandler(todoTitle) {
        let newTodo = {
            "title": todoTitle,
            "completed": false
        }
        
        if(newTodo.title === '') {
            this.setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
        }
        else if(newTodo.title !== '') {
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
        }
        else {
            this.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
        }
    }

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
                        addTodo      = {this.onClickHandler}
                        addAlertType = {this.addAlertType}
                        alertClass   = {this.state.alertClass}
                        alertMessage = {this.state.alertMessage}
                        fetchTodos   = {this.fetchTodos}
                    />
                    <TodoList todos = {this.state.todos} />
                    <TodosCount />
                </main>
            </div>
        );
    }
}

export default App;