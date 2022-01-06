import React, { Component } from "react";
import { TodoItem } from "./TodoItem";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'todos' :  [
                {'id': 1, 'title': 'Learn HTML', 'completed': false},
                {'id': 2, 'title': 'Learn CSS', 'completed': false},
                {'id': 3, 'title': 'Learn JavaScript', 'completed': false}
            ]
        };
    }

    render() {
        return (
            <>
                <ul className="todo-items">
                    {this.state.todos.map( (todo, index) =>
                        <TodoItem key={index} id={todo.id} title={todo.title} completed={todo.completed} />
                    )}
                </ul>
            </>
        );
    }
}

export { TodoList };