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
                const { data } = await addTodo({ title: this.state.currentTodo });
                const todos = originalTodos;
                todos.push(data);
                this.setState({ todos, currentTodo: "" });

                this.setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
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
            const index = todos.findIndex(todo => todo._id === currentTodo);
            
            todos[index] = { ...todos[index] };
            todos[index].completed = !todos[index].completed;
            this.setState({ todos });
            
            await updateTodo(currentTodo, {
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
            const index = todos.findIndex(todo => todo._id === currentTodo);

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
                        await updateTodo(currentTodo, {
                            title: todos[index].title,
                        });

                        this.setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);
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
                todo => todo._id !== currentTodo
            );

            const deleteConfirmation = window.confirm("Are you sure you want to delete this todo item?");

            if(deleteConfirmation) {
                this.setState({ todos });
                await deleteTodo(currentTodo);

                this.setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
            }
        }
        catch (error) {
            this.setState({ todos: originalTodos });
            console.log(error);
        }
    };
}

export default Todos;