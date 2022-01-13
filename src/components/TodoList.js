import React from "react";
import { TodoItem } from "./TodoItem";

function TodoList(props) {
    return (
        <>
            <ul className="todo-items">
                {props.todos.map( (todo, index) =>
                    <TodoItem key={todo.id} todo = {todo} toggleComplete = {props.toggleComplete} editTodo = {props.editTodo} removeTodo = {props.removeTodo} />
                )}
            </ul>
        </>
    );
}

export { TodoList };