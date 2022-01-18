import React, {useContext} from "react";
import { TodoItem } from "./TodoItem";
import { TodosContext } from "../todosContext";

function TodoList(props) {
    const {todos} = useContext(TodosContext);
    
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