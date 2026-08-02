const express = require("express");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    completeTask,
    pendingTask,
} = require("../controllers/taskController");

const router = express.Router();


// CREATE TASK
router.post("/", createTask);


// GET ALL TASKS
// SEARCH: /tasks?search=project
// FILTER: /tasks?status=COMPLETED
router.get("/", getTasks);


// GET TASK BY ID
router.get("/:id", getTaskById);


// UPDATE TASK
router.put("/:id", updateTask);


// DELETE TASK
router.delete("/:id", deleteTask);


// MARK TASK AS COMPLETED
router.patch("/:id/complete", completeTask);


// MARK TASK AS PENDING
router.patch("/:id/pending", pendingTask);


module.exports = router;