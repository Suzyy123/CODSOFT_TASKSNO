// VALIDATE TASK ID
const validateTaskId = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid task ID",
        });
    }

    next();
};


// VALIDATE CREATE TASK
const validateCreateTask = (req, res, next) => {
    const {
        title,
        priority,
        dueDate,
    } = req.body;

    // TITLE
    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            message: "Title is required",
        });
    }

    // PRIORITY
    const validPriorities = ["LOW", "MEDIUM", "HIGH"];

    if (
        priority &&
        !validPriorities.includes(priority.toUpperCase())
    ) {
        return res.status(400).json({
            message: "Priority must be LOW, MEDIUM, or HIGH",
        });
    }

    // DUE DATE
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({
            message: "Invalid due date",
        });
    }

    next();
};


// VALIDATE UPDATE TASK
const validateUpdateTask = (req, res, next) => {
    const {
        title,
        status,
        priority,
        dueDate,
    } = req.body;

    // TITLE
    if (
        title !== undefined &&
        (typeof title !== "string" || title.trim() === "")
    ) {
        return res.status(400).json({
            message: "Title cannot be empty",
        });
    }

    // STATUS
    const validStatuses = ["PENDING", "COMPLETED"];

    if (
        status &&
        !validStatuses.includes(status.toUpperCase())
    ) {
        return res.status(400).json({
            message: "Status must be PENDING or COMPLETED",
        });
    }

    // PRIORITY
    const validPriorities = ["LOW", "MEDIUM", "HIGH"];

    if (
        priority &&
        !validPriorities.includes(priority.toUpperCase())
    ) {
        return res.status(400).json({
            message: "Priority must be LOW, MEDIUM, or HIGH",
        });
    }

    // DUE DATE
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({
            message: "Invalid due date",
        });
    }

    next();
};


module.exports = {
    validateTaskId,
    validateCreateTask,
    validateUpdateTask,
};