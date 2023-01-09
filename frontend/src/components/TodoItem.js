import React from "react";

function TodoItem ({todo, handleToggleCompleted, handleEdit, handleDelete}) {
    return (
        <li data-id={todo.id}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <div className="action-icon remove" onClick={() => handleDelete(todo.id)}><i className="far fa-trash-alt"></i></div>
            <div className="action-icon edit" onClick={() => handleEdit(todo.id)}><i className="fas fa-pencil-alt"></i></div>
            <div className="action-icon complete" onClick={() => handleToggleCompleted(todo.id)}><i className={`far ${todo.completed ? 'fa-check-square' : 'fa-square'}`}></i></div>
        </li>
  );
}

export { TodoItem };