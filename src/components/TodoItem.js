import React from "react";

const TodoItem = (props) => {
    return (
      <li id={props.id}>
          <span className={props.completed ? 'completed' : ''}>{props.title}</span>
          <div className="action-icon complete"><i className="far fa-check-square"></i></div>
          <div className="action-icon edit"><i className="fas fa-pencil-alt"></i></div>
          <div className="action-icon remove"><i className="far fa-trash-alt"></i></div>
      </li>
    );
}

export { TodoItem };