import { createContext, useState, useEffect } from "react";

const TodosContext = createContext();

const TodosContextProvider = (props) => {
    const APIRoot = "http://localhost:3001/todos";
    const [todos, setTodos] = useState([]);
    
    // console.dir(TodosContext);

    function fetchTodos() {
        fetch(APIRoot)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(data =>
            // Change local state
            setTodos([...data])
        )
        .catch(err => console.error(err));
    }

    useEffect((props) => {
        fetchTodos();
    }, []);

    let store = {todos, setTodos}
    
    return (
        <TodosContext.Provider value={store} >
            {props.children}
        </TodosContext.Provider>
    )
}

export {TodosContextProvider, TodosContext};