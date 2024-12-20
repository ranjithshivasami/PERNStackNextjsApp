const express = require('express');

const router = express.Router();
const taskController = require("../controllers/taskController");
//task/get
router.get('/get-tasks', taskController.getTasks);
router.get('/get-task/:id', taskController.getTask);
router.post('/create-task', taskController.createTask);
router.put('/update-task/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

module.exports = router;