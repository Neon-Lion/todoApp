const db     = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get() {
    const rows = await db.query(
        `SELECT id, title, completed FROM todos`
    );

    const data = helper.emptyOrRows(rows);

    return data;
}

/* Query for inserting todo */
async function create(todo) {
    const result = await db.query(
        `INSERT INTO todos (title, completed)
        VALUES ("${todo.title}", "${todo.completed}")`
    );

    let message = "Error in creating todo.";

    if (result.affectedRows) {
        id = result.insertId;
        message = "To do item was added successfully.";
    }

    return { id, message };
}

/* Query for updating todo */
async function update(id, todo) {
    const result = await db.query(
        `UPDATE todos
        SET title="${todo.title}", completed="${todo.completed}"
        WHERE id=${id}`
    );
  
    let message = "Error in updating todo.";
  
    if (result.affectedRows) {
        message = "To do item was edited successfully.";
    }

    return { message };
}

/* Query for deleting todo */
async function remove(id){
    const result = await db.query(
        `DELETE FROM todos WHERE id=${id}`
    );

    let message = "Error in deleting todo.";

    if (result.affectedRows) {
        message = "To do item was deleted successfully.";
    }

    return { message };
}

module.exports = { get, create, update, remove }