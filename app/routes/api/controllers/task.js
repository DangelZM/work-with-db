const express = require('express');
const controller = express.Router();

const Task = require('../../../models/Task');

controller.get('/', (req, res, next) => {
  Task.find({})
    .then(tasks => res.send(tasks))
    .catch(err => next(err))
});

controller.get('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => res.send(task))
    .catch(err => next(err))
});

module.exports = controller;


