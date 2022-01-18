import React, { useContext } from "react";
import { TodosContext } from "../todosContext";
import { TodoItem } from "./TodoItem";

function TodoList(props) {
    let {todos} = useContext(TodosContext);
    
    return (
        <>
            <ul className="todo-items">
                {todos.map( (todo, index) =>
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