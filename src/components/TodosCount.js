import React from "react";

function TodosCount({todos}) {
    return (
        <>
            <div className="todos-total">
                Total items: <span className="output">{todos.length}</span>
            </div>
        </>
    );
}

export { TodosCount };