import React from "react";
import { TodoItem } from "./TodoItem";

function TodoList(props) {
    return (
        <>
            <ul className="todo-items">
                {props.todos.map( (todo, index) =>
                    <TodoItem
                        key            = {index}
                        todo           = {todo}
                        toggleComplete = {props.toggleComplete}
                        editTodo       = {props.editTodo}
                        removeTodo     = {props.removeTodo}
                    />
                )}
            </ul>
        </>
    );
}

export { TodoList };