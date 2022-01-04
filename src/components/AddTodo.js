import React from "react";

const AddTodo = () => {
    return (
        <>
            <div className="alert feedback centerAlign"></div>
            <div className="todo-add">
                <input type="text" autoFocus placeholder="Add new todo ..." />
                <button className="add-btn" type="button">Add</button>
            </div>
        </>
    );
}

export { AddTodo };