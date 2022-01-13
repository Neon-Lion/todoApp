import React from "react";

function TodoItem ({todo, toggleComplete, editTodo, removeTodo}) {
    function toggle() {
        toggleComplete(todo.id)
    }

    function edit() {
        editTodo(todo.id)
    }

    function remove() {
        removeTodo(todo.id);
    }

    return (
        <li data-id={todo.id}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <div className="action-icon remove" onClick={remove}><i className="far fa-trash-alt"></i></div>
            <div className="action-icon edit" onClick={edit}><i className="fas fa-pencil-alt"></i></div>
            <div className="action-icon complete" onClick={toggle}><i className={`far ${todo.completed ? 'fa-check-square' : 'fa-square'}`}></i></div>
        </li>
  );
}

export { TodoItem };