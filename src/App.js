// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
import {TodosContextProvider, TodosContext} from "./todosContext";

import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";

function App() {
    // let [todos, setTodos] = useState([]);
    // const [alertMessage, setAlertMessage] = useState("");
    // const [alertClass, setAlertClass] = useState("");

    // // setTimeOut for alerts
    // function setTimeOutForAlerts(alertMessage, alertType, seconds) {
    //     // Change local state
    //     setAlertMessage(alertMessage);
    //     setAlertClass('showItem alert-' + alertType);

    //     setTimeout(
    //         () => {
    //             // Change local state
    //             setAlertMessage("");
    //             setAlertClass("");
    //         }, seconds);
    // }

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