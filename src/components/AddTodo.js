import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../todosContext";

function AddTodo(props) {
    const [inputValue, setInputValue] = useState("");
    const {todos, setTodos} = useContext(TodosContext);

    const APIRoot  = "http://localhost:3001/todos";

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
            console.log(1);
            // setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
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
                setTodos(data)
                
                // setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
            })
            .catch(err => console.error(err));
        }
        else {
            console.log(1);
            // setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
        }
    }

    return (
        <>
            <div className={`alert feedback centerAlign ${props.alertClass}`}>{props.alertMessage}</div>
            <div className="todo-add">
                <input type="text"
                    autoFocus
                    placeholder="Add new todo ..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={ e => {
                        if (e.key === 'Enter') {
                            // add(props)
                            addTodo(inputValue)
                        }
                    }}
                />
                <button
                    className="add-btn"
                    type="button"
                    onClick={() => addTodo(inputValue)}
                >Add</button>
            </div>
        </>
    );
}

export { AddTodo };