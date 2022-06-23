import axios from "axios";

const apiUrl = "http://10.0.2.2:8080/tasks";

// Send GET request
export function getTasks() {
    return axios.get(apiUrl);
}

// Send POST request
export function addTask(task) {
    return axios.post(apiUrl, task);
}

// Send PUT request
export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

// Send DELETE request
export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}