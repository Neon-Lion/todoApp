import React from "react";
import { TodoItem } from "./TodoItem";
import { todos } from "../App";

const TodoList = (props) => {
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