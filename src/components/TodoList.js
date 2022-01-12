import React from "react";
import { TodoItem } from "./TodoItem";

function TodoList(props) {
    return (
        <>
            <ul className="todo-items">
                {props.todos.map( (todo, index) =>
                    // <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
                    <TodoItem key={todo.id} todo = {todo} />
                )}
            </ul>
        </>
    );
}

export { TodoList };