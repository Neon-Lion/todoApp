import React, { useContext } from "react";
import { TodosContext } from "../todosContext";

function TodoItem({todo}) {
    const {APIRoot, todos, setTodos, setTimeOutForAlerts} = useContext(TodosContext);
    
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
            setTodos(newTodos);

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
                    let newTodos = todos.map( todo => 
                        todo.id === id ? {...todo, "title": todo.title} : todo
                    )

                    setTodos(newTodos);
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

        // Create a new PATCH Request object
        let completeTodo = new Request(`${APIRoot}/${id}`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                completed: !todo.completed
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
                    todo.id === id ? {...todo, "completed": !todo.completed} : todo
                )

                setTodos(newTodos);
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <li id={todo.id}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <div className="action-icon remove" onClick={event => removeTodo(todo.id)}><i className="far fa-trash-alt"></i></div>
            <div className="action-icon edit" onClick={event => editTodo(todo.id)}><i className="fas fa-pencil-alt"></i></div>
            <div className="action-icon complete" onClick={event => toggleComplete(todo.id)}><i className={`far ${todo.completed ? 'fa-check-square' : 'fa-square'}`}></i></div>
        </li>
    );
}

export { TodoItem };