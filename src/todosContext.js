import { createContext, useState, useEffect } from "react";

const TodosContext = createContext();

const TodosContextProvider = (props) => {
    const APIRoot = "http://localhost:3001/todos";
    const [todos, setTodos] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    // setTimeOut for alerts
    function setTimeOutForAlerts(alertMessage, alertType, seconds) {
        // Change local state
        setAlertMessage(alertMessage);
        setAlertClass('showItem alert-' + alertType);

        setTimeout(
            () => {
                // Change local state
                setAlertMessage("");
                setAlertClass("");
            }, seconds);
    }

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
            setTodos(data)
        )
        .catch(err => console.error(err));
    }

    useEffect((props) => {
        fetchTodos();
    }, []);

    let store = {APIRoot, todos, alertMessage, alertClass, setTodos, setTimeOutForAlerts}
    
    return (
        <TodosContext.Provider value={store}>
            {props.children}
        </TodosContext.Provider>
    )
}

export {TodosContextProvider, TodosContext};