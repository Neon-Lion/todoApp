import axios from "axios";

const apiUrl = "http://127.0.0.1:8080/todos";

// Send GET request
export function getTodos() {
    return axios.get(apiUrl);
}

// Send POST request
export function addTodo(todo) {
    return axios.post(apiUrl, todo);
}

// Send PUT request
export function updateTodo(id, todo) {
    return axios.put(apiUrl + "/" + id, todo);
}

// Send DELETE request
export function deleteTodo(id) {
    return axios.delete(apiUrl + "/" + id);
}