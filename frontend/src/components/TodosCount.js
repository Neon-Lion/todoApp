import React, { Component } from "react";

class TodosCount extends Component {
    render(props) {
        return (
            <>
                <div className="todos-total">
                    Total items: <span className="output">{this.props.todos.length}</span>
                </div>
            </>
        );
    }
}

export { TodosCount };