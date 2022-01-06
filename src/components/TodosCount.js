import React, { Component } from "react";

class TodosCount extends Component {
    render() {
        return (
            <>
                <div className="todos-total">
                    Total items: <span className="output"></span>
                </div>
            </>
        );
    }
}

export { TodosCount };