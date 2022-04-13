import React from "react";
import { TodoItem } from "./TodoItem";

function TodoList(props) {
    return (
        <>
            <ul className="todo-items">
                {props.todos.map( todo =>
                    <TodoItem
                        key={todo._id}
                        todo = {todo}
                        handleToggleCompleted = {props.handleToggleCompleted}
                        handleEdit = {props.handleEdit}
                        handleDelete = {props.handleDelete}
                    />
                )}
            </ul>
        </>
    );
}

export { TodoList };