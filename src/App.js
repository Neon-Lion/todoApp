// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";

function App() {
    const APIRoot  = "http://localhost:3001/todos";

    let [todos, setTodos] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    // setTimeOut for alerts
    function setTimeOutForAlerts(alertMessage, alertType, seconds) {
        // Change local state
        setAlertMessage(alertMessage);
        setAlertClass('showItem alert-' + alertType);

        setTimeout(
            () => {
                // Change local state
                setAlertMessage("");
                setAlertClass("");
            }, seconds);
    }

    function fetchTodos() {
        fetch(APIRoot)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(data =>
            // Change local state
            setTodos([...data])
        )
        .catch(err => console.error(err));
    }

    useEffect((props) => {
        fetchTodos();
    }, []);

     // Add Todo Item
    function addTodo(todoTitle) {
        let newTodo = {
            "title": todoTitle,
            "completed": false
        }

        let hasValue = false;

        if(todos !== "") {
            for (let i = 0; i < todos.length; i++) {	
                if(todos[i].title.toLocaleLowerCase() === newTodo.title.toLocaleLowerCase()) {
                    hasValue = true;

                    break;
                }
                else {
                    hasValue = false;
                }
            }
        }

        if(newTodo.title === '') {
            setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
        }
        else if(newTodo.title !== '' && hasValue === false) {
            // Create a new POST Request object
            let postTodos = new Request(APIRoot,
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
                setTodos([...todos, data])
                
                setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
            })
            .catch(err => console.error(err));
        }
        else {
            setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
        }
    }

    // Remove Todo Item
    function removeTodo(id) {
        // Create a new DELETE Request object
        let deleteTodo = new Request(`${APIRoot}/${id}`,
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
            let newTodos = todos.filter(todo => todo.id !== id)
            setTodos(newTodos)

            setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
        })
        .catch(err => console.error(err));
    }

    // Edit Todo Item
    function editTodo(id) {
        // Get the index of todo to be edited from todos array
        let index = todos.findIndex(todo => todo.id === id);

        if(index !== -1) {
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
                else {
                    // this.fetchTodos();
                    let newTodos = todos.map( todo => 
                        todo.id === id ? {"title": todo.title, "completed": todo.completed, "id": todo.id} : todo
                    )

                    setTodos(newTodos)
                }

                setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);
            })
            .catch(err => console.error(err));
        }
    }

    // Toggle completed/uncompleted Todo Item
    function toggleComplete(id) {
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
            else {
                let newTodos = todos.map( todo => 
                    todo.id === id ? {"title": todo.title, "completed": todo.completed, "id": todo.id} : todo
                )

                setTodos(newTodos)
            }
        })
        .catch(err => console.error(err));
    }

    return (
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //         Learn React
        //         </a>
        //     </header>
        // </div>

        <div className="page">
            <Header />
            <main className="todo-app">
                <AddTodo
                    addTodo      = {addTodo}
                    alertClass   = {alertClass}
                    alertMessage = {alertMessage}
                    fetchTodos   = {fetchTodos}
                />
                <TodoList
                    todos          = {todos}
                    toggleComplete = {toggleComplete}
                    editTodo       = {editTodo}
                    removeTodo     = {removeTodo}
                />
                <TodosCount todos = {todos} />
            </main>
        </div>
    );
}

export default App;