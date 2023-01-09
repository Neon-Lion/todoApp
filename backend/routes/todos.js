const todos   = require('../services/todos');
const express = require('express');
const router  = express.Router();

/* Respond to the GET request */
router.get('/', async function(req, res, next) {
    try {
        res.json(await todos.get(req.query));
    }
    catch (err) {
        console.error("Error while getting todos.", err.message);
        next(err);
    }
});

/* Respond to the POST request */
router.post('/', async function(req, res, next) {
    try {
        res.json(await todos.create(req.body));
    }
    catch (err) {
        console.error("Error while creating todo.", err.message);
        next(err);
    }
});

/* Respond to the PUT request */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await todos.update(req.params.id, req.body));
    }
    catch (err) {
        console.error("Error while updating todo.", err.message);
        next(err);
    }
});

/* Respond to the DELETE request */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await todos.remove(req.params.id));
    }
    catch (err) {
        console.error("Error while deleting employee!", err.message);
        next(err);
    }
});

module.exports = router;