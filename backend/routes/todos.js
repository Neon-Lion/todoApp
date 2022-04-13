const Todo    = require("../models/todo");
const express = require("express");
const router  = express.Router();

// Respond to the POST request
router.post("/", async (req, res) => {
    try {
        const todo = await new Todo(req.body).save();
        res.send(todo);
    }
    catch (error) {
        res.send(error);
    }
});

// Respond to the GET request
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    }
    catch (error) {
        res.send(error);
    }
});

// Respond to the PUT request
router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );

        res.send(todos);
    }
    catch (error) {
        res.send(error);
    }
});

// Respond to the DELETE request
router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.send(todo);
    }
    catch (error) {
        res.send(error);
    }
});

module.exports = router;