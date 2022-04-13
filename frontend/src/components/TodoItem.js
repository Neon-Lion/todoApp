import React from "react";

function TodoItem ({todo, handleToggleCompleted, handleEdit, handleDelete}) {
    return (
        <li data-id={todo._id}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <div className="action-icon remove" onClick={() => handleDelete(todo._id)}><i className="far fa-trash-alt"></i></div>
            <div className="action-icon edit" onClick={() => handleEdit(todo._id)}><i className="fas fa-pencil-alt"></i></div>
            <div className="action-icon complete" onClick={() => handleToggleCompleted(todo._id)}><i className={`far ${todo.completed ? 'fa-check-square' : 'fa-square'}`}></i></div>
        </li>
  );
}

export { TodoItem };