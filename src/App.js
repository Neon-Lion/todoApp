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

        this.APIRoot = "http://localhost:3000/todos";

        this.state = {
            todos: []
        };

        this.onClickHandler = this.onClickHandler.bind(this);
        this.fetchTodos = this.fetchTodos.bind(this);
    }

    fetchTodos() {
        fetch(this.APIRoot)
        .then(r => {
            if(r.ok) {
                return r.json();
            }
        })
        .then(data => {
                this.setState({
                todos: data
            })
        })
        .catch(err => console.warn(err))
    }

    onClickHandler(todoTitle) {
        let todo = {
            "title": todoTitle,
            "completed": false,
            "id": 7
        }

        this.setState({ "todos": [...this.state.todos, todo] })
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
                    <AddTodo addTodo = {this.onClickHandler} />
                    <TodoList todos = {this.state.todos} />
                    <TodosCount />
                </main>
            </div>
        );
    }
}

export default App;