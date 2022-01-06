import React from "react";
import { TodoItem } from "./TodoItem";

const TodoList = (props) => {
    const todos = [
        {'id': 1, 'title': 'Learn HTML', 'completed': false},
        {'id': 2, 'title': 'Learn CSS', 'completed': false},
        {'id': 3, 'title': 'Learn JavaScript', 'completed': false}
    ];

    return (
        <>
            <ul className="todo-items">
                {todos.map( (todo, index) =>
                    <TodoItem key={index} id={todo.id} title={todo.title} completed={todo.completed} />
                )}
            </ul>
        </>
    );
}

export { TodoList };