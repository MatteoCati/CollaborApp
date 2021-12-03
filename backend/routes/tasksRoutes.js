const express = require('express');
const router = express.Router();
const tasksController = require("../controllers/tasksController")


/* Get a list of activities from database */ 
router.get('/tasks', tasksController.getTasks);


/* Add new activity to the datebase */
router.post('/tasks', tasksController.addTask);

/* Update an activity in the database */ 
router.put('/tasks/:id', tasksController.updateTask);

/* Delete an activity from the database */ 
router.delete('/tasks/:id', tasksController.deleteTask);

/* Get a list of activities from database */ 
router.get('/tasks/:id', tasksController.getTask);

module.exports = router;