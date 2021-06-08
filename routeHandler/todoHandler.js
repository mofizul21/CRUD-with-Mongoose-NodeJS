const express = require('express');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');

const Todo = new mongoose.model('Todo', todoSchema);

// Get all the todos
router.get('/', async (req, res) => {
    await Todo.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!',
            });
        } else {
            res.status(200).json({
                result: data,
                message: 'All todos are here!',
            });
        }
    });
});

// Get a todo
router.get('/:id', async (req, res) => {
    //
});

// Post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!',
            });
        } else {
            res.status(200).json({
                message: 'Todo saved successfully!',
            });
        }
    });
});

// Post multiple todo
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!',
            });
        } else {
            res.status(200).json({
                message: 'Todos saved successfully!',
            });
        }
    });
});

// Put todo
router.put('/:id', async (req, res) => {
    await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: 'active',
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error!',
                });
            } else {
                res.status(200).json({
                    message: 'Todo updated successfully!',
                });
            }
        }
    );
});

// Delete todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!',
            });
        } else {
            res.status(200).json({
                message: 'Todo deleted successfully!',
            });
        }
    });
});

module.exports = router;
