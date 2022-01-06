import React, { Component } from "react";

class TodoItem extends Component {
  render() {
    return (
      <li id={this.props.id}>
          <span className={this.props.completed ? 'completed' : ''}>{this.props.title}</span>
          <div className="action-icon complete"><i className="far fa-check-square"></i></div>
          <div className="action-icon edit"><i className="fas fa-pencil-alt"></i></div>
          <div className="action-icon remove"><i className="far fa-trash-alt"></i></div>
      </li>
    )
  }
}

export { TodoItem };