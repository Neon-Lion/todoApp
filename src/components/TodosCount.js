import React, {useContext} from "react";
import { TodosContext } from "../todosContext";

function TodosCount() {
    const todos = useContext(TodosContext);

    return (
        <>
            <div className="todos-total">
                Total items: <span className="output">{todos.length}</span>
            </div>
        </>
    );
}

export { TodosCount };