// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { TodosContextProvider } from "./todosContext";

import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";

function App() {
    return (
        <div className="page">
            <TodosContextProvider>            
                <Header />
                <main className="todo-app">
                    <AddTodo />
                    <TodoList />
                    <TodosCount />
                </main>
            </TodosContextProvider>
        </div>
    );
}

export default App;