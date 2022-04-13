import React, { Component } from "react";

class AddTodo extends Component {
    render(props) {
        return (
            <>
                <div className={`alert feedback centerAlign ${this.props.alertClass}`}>{this.props.alertMessage}</div>
                <div className="todo-add">
                    <input type="text" autoFocus placeholder="Add new todo ..."
                        value={this.props.currentTodo}
                        onChange={this.props.handleChange}
                        onKeyPress={ (e) => {
                            if (e.key === 'Enter') {
                                this.props.handleAdd()
                            }
                        }}
                    />
                    <button className="add-btn" type="button" onClick={this.props.handleAdd}>Add</button>
                </div>
            </>
        );
    }
}

export { AddTodo };