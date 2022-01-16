import React, { useState, useEffect } from "react";

function AddTodo(props) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        props.fetchTodos();
    }, []);

    function add() {
        props.addTodo(inputValue);
        setInputValue("");
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
                            add(props)
                        }
                    }}
                />
                <button
                    className="add-btn"
                    type="button"
                    onClick={add}
                >Add</button>
            </div>
        </>
    );
}

export { AddTodo };