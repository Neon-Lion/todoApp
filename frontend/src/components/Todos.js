import { Component } from "react";
import {
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo,
} from "../services/todoServices";

class Todos extends Component {
    state = {
        todos: [],
        currentTodo: ""
    };

    // setTimeOut for alerts
    setTimeOutForAlerts(alertMessage, alertType, seconds) {
        // Change local state
        this.setState({
            "alertMessage": alertMessage,
            "alertType": alertType,
            "showItem": true,
            "alertClass": `showItem alert-${alertType}`
        })

        setTimeout(
            () => {
                // Change local state
                this.setState({
                    "alertMessage": "",
                    "alertType": "",
                    "showItem": false,
                    "alertClass": ""
                })
            }, seconds);
    }

    // Execute the React code when the component is already placed in the DOM
    async componentDidMount() {
        try {
            const { data } = await getTodos();
            this.setState({ todos: data });
        }
        catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTodo: input.value });
    };

    // Add Todo Item
    handleAdd = async () => {
        const originalTodos = this.state.todos;

        let hasValue = false;

        if(originalTodos !== "") {
            for (let i = 0; i < originalTodos.length; i++) {	
                if(originalTodos[i].title.toLocaleLowerCase() === this.state.currentTodo.toLocaleLowerCase()) {
                    hasValue = true;

                    break;
                }
                else {
                    hasValue = false;
                }
            }
        }

        try {
            if(this.state.currentTodo === '') {
                this.setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
            }
            else if(this.state.currentTodo !== '' && hasValue === false) {
                const { data } = await addTodo({ title: this.state.currentTodo, completed: 0 });
                console.log(data);
                const todos = originalTodos;
                todos.push({id: data.id, title: this.state.currentTodo, completed: 0});
                this.setState({ todos, currentTodo: "" });

                this.setTimeOutForAlerts(`${data.message}`, "success", 3000);
            }
            else {
                this.setState({ originalTodos, currentTodo: "" });
                this.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    // Toggle completed/uncompleted Todo Item
    handleToggleCompleted = async (currentTodo) => {
        const originalTodos = this.state.todos;
        
        try {
            const todos = [...originalTodos];
            const index = todos.findIndex(todo => todo.id === currentTodo);
            
            todos[index] = { ...todos[index] };
            if(todos[index].completed === 0) {
                todos[index].completed = 1;
            }
            else {
                todos[index].completed = 0;
            }
            
            this.setState({ todos });

            await updateTodo(currentTodo, {
                title: todos[index].title,
                completed: todos[index].completed,
            });
        }
        catch (error) {
            this.setState({ todos: originalTodos });
            console.log(error);
        }
    };

    // Edit Todo Item
    handleEdit = async (currentTodo) => {
        const originalTodos = this.state.todos;
        
        try {
            const todos = [...originalTodos];
            const index = todos.findIndex(todo => todo.id === currentTodo);

            if(index !== -1) {
                todos[index] = { ...todos[index] };
                const editValue = prompt("Edit the selected item", todos[index].title);
                
                let hasValue = false;

                if(originalTodos !== "") {
                    for (let i = 0; i < originalTodos.length; i++) {	
                        if(originalTodos[i].title.toLocaleLowerCase() === editValue.toLocaleLowerCase()) {
                            hasValue = true;

                            break;
                        }
                        else {
                            hasValue = false;
                        }
                    }
                }

                try {
                    if(editValue === '') {
                        this.setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
                    }
                    else if(editValue !== '' && hasValue === false) {
                        todos[index].title = editValue;

                        this.setState({ todos });
                        const { data } = await updateTodo(currentTodo, {
                            title: todos[index].title,
                            completed: todos[index].completed
                        });
        
                        this.setTimeOutForAlerts(`${data.message}`, "success", 3000);
                    }
                    else {
                        this.setState({ originalTodos, currentTodo: "" });
                        this.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        catch (error) {
            this.setState({ todos: originalTodos });
            console.log(error);
        }
    };

    // Remove Todo Item
    handleDelete = async (currentTodo) => {
        const originalTodos = this.state.todos;
        
        try {
            const todos = originalTodos.filter(
                todo => todo.id !== currentTodo
            );

            const deleteConfirmation = window.confirm("Are you sure you want to delete this todo item?");

            if(deleteConfirmation) {
                this.setState({ todos });
                const { data } = await deleteTodo(currentTodo);

                this.setTimeOutForAlerts(`${data.message}`, "success", 3000);
            }
        }
        catch (error) {
            this.setState({ todos: originalTodos });
            console.log(error);
        }
    };
}

export default Todos;