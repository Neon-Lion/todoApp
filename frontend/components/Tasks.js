import { Component } from "react";
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} from "../services/taskServices";

class Tasks extends Component {
    state = {
        tasks: [],
        currentTask: ""
    };

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

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        }
        catch (error) {
            console.log(error);
        }
    }

    handleChange = (newTask) => {
        this.setState({ currentTask: newTask });
    };

    handleAdd = async () => {
        const originalTasks = this.state.tasks;

        let hasValue = false;

        if(originalTasks !== "") {
            for (let i = 0; i < originalTasks.length; i++) {	
                if(originalTasks[i].title.toLocaleLowerCase() === this.state.currentTask.toLocaleLowerCase()) {
                    hasValue = true;

                    break;
                }
                else {
                    hasValue = false;
                }
            }
        }

        try {
            if(this.state.currentTask === '') {
                this.setTimeOutForAlerts("Please enter valid value.", "danger", 3000);
            }
            else if(this.state.currentTask !== '' && hasValue === false) {
                const { data } = await addTask({ title: this.state.currentTask });
                const tasks = originalTasks;
                tasks.push(data);
                this.setState({ tasks, currentTask: "" });

                this.setTimeOutForAlerts("To do item was added successfully.", "success", 3000);
            }
            else {
                this.setState({ originalTasks, currentTask: "" });
                this.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    handleToggleCompleted = async (currentTask) => {
        const originalTasks = this.state.tasks;
        
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks });
            
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
        }
        catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleEdit = async (currentTask, editValue) => {
        const originalTasks = this.state.tasks;
        
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);

            if(index !== -1) {
                let hasValue = false;
                
                for (let i = 0; i < originalTasks.length; i++) {	
                    if(originalTasks[i].title.toLocaleLowerCase() === editValue.toLocaleLowerCase()) {
                        hasValue = true;
    
                        break;
                    }
                    else {
                        hasValue = false;
                    }
                }

                if(hasValue) {
                    this.setTimeOutForAlerts("There is an item with that value.", "danger", 3000);
                }
                else {
                    tasks[index] = { ...tasks[index] };
                    tasks[index].title = editValue;
                    
                    this.setState({ tasks });
                    await updateTask(currentTask, {
                        title: tasks[index].title,
                    });
    
                    this.setTimeOutForAlerts("To do item was edited successfully.", "success", 3000);
                }
            }
        }
        catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        
        try {
            const tasks = originalTasks.filter(
                task => task._id !== currentTask
            );

            this.setState({ tasks });
            await deleteTask(currentTask);

            this.setTimeOutForAlerts("To do item was deleted successfully.", "success", 3000);
        }
        catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default Tasks;