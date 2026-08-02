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

const {
    validateTaskId,
    validateCreateTask,
    validateUpdateTask,
} = require("../middleware/taskValidation");

const router = express.Router();


// CREATE TASK
router.post(
    "/",
    validateCreateTask,
    createTask
);


// GET ALL TASKS
// SEARCH: /tasks?search=project
// FILTER: /tasks?status=COMPLETED
router.get(
    "/",
    getTasks
);


// GET TASK BY ID
router.get(
    "/:id",
    validateTaskId,
    getTaskById
);


// UPDATE TASK
router.put(
    "/:id",
    validateTaskId,
    validateUpdateTask,
    updateTask
);


// DELETE TASK
router.delete(
    "/:id",
    validateTaskId,
    deleteTask
);


// MARK TASK AS COMPLETED
router.patch(
    "/:id/complete",
    validateTaskId,
    completeTask
);


// MARK TASK AS PENDING
router.patch(
    "/:id/pending",
    validateTaskId,
    pendingTask
);


module.exports = router;