import React from "react";

function TodoItem ({todo}) {
    return (
        <li data-id={todo.id}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <div className="action-icon remove"><i className="far fa-trash-alt"></i></div>
            <div className="action-icon edit"><i className="fas fa-pencil-alt"></i></div>
            <div className="action-icon complete"><i className={`far ${todo.completed ? 'fa-check-square' : 'fa-square'}`}></i></div>
        </li>
  );
}

export { TodoItem };