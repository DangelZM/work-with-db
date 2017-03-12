const express = require('express');
const controller = express.Router();

const Project = require('../../../models/Project');
const Task = require('../../../models/Task');

// Projects
controller.post('/', (req, res, next) => {
  Project.create(req.body)
    .then(project => res.send(project))
    .catch(err => next(err))
});

controller.get('/', (req, res, next) => {
  Project.find({})
    .then(projects => res.send(projects))
    .catch(err => next(err))
});

controller.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(projects => res.send(projects))
    .catch(err => next(err))
});

//Tasks
controller.post('/:id/tasks', (req, res, next) => {
  Task.create(Object.assign(req.body, {project: req.params.id}))
    .then(task => res.send(task))
    .catch(err => next(err))
});

controller.get('/:id/tasks', (req, res, next) => {
  Task.find({project: req.params.id})
    .then(tasks => res.send(tasks))
    .catch(err => next(err))
});

module.exports = controller;