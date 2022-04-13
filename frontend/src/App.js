// import logo from './logo.svg';
// import './App.css';

import React from "react";
import Todos from "./components/Todos";

import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";

class App extends Todos {
    constructor(props) {
        super(props);
                
        this.state = {
            todos: [],
            currentTodo: "",

            alertMessage: "",
            alertType: "",
            showItem: false,
            alertClass: ""
        };
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
                        currentTodo  = {this.state.currentTodo}
                        handleChange = {this.handleChange}
                        handleAdd    = {this.handleAdd}
                        alertClass   = {this.state.alertClass}
                        alertMessage = {this.state.alertMessage}
                    />
                    <TodoList todos = {this.state.todos} handleToggleCompleted = {this.handleToggleCompleted} handleEdit = {this.handleEdit} handleDelete = {this.handleDelete} />
                    <TodosCount todos = {this.state.todos} />
                </main>
            </div>
        );
    }
}

export default App;