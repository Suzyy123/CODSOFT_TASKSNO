const prisma = require("../config/db");


// CREATE TASK
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            category,
            dueDate,
        } = req.body;

        // VALIDATE TITLE
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        // VALIDATE PRIORITY
        const validPriorities = ["LOW", "MEDIUM", "HIGH"];

        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({
                message: "Priority must be LOW, MEDIUM, or HIGH",
            });
        }

        // VALIDATE DUE DATE
        if (dueDate && isNaN(new Date(dueDate).getTime())) {
            return res.status(400).json({
                message: "Invalid due date",
            });
        }

        // CREATE TASK
        const task = await prisma.task.create({
            data: {
                title: title.trim(),
                description,
                priority: priority || "MEDIUM",
                category,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
        });

        res.status(201).json({
            message: "Task created successfully",
            data: task,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// GET ALL TASKS
// SUPPORT SEARCH AND FILTER
const getTasks = async (req, res) => {
    try {
        const { status, search } = req.query;

        // VALIDATE STATUS
        const validStatuses = ["PENDING", "COMPLETED"];

        if (status && !validStatuses.includes(status.toUpperCase())) {
            return res.status(400).json({
                message: "Status must be PENDING or COMPLETED",
            });
        }

        const tasks = await prisma.task.findMany({
            where: {
                // FILTER BY STATUS
                ...(status && {
                    status: status.toUpperCase(),
                }),

                // SEARCH BY TITLE
                ...(search && {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                }),
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// GET TASK BY ID
const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // VALIDATE ID
        if (isNaN(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        const task = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        // TASK NOT FOUND
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json({
            message: "Task fetched successfully",
            data: task,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // VALIDATE ID
        if (isNaN(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        // CHECK IF TASK EXISTS
        const existingTask = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const {
            title,
            description,
            status,
            priority,
            category,
            dueDate,
        } = req.body;

        // VALIDATE TITLE
        if (title !== undefined && title.trim() === "") {
            return res.status(400).json({
                message: "Title cannot be empty",
            });
        }

        // VALIDATE STATUS
        const validStatuses = ["PENDING", "COMPLETED"];

        if (status && !validStatuses.includes(status.toUpperCase())) {
            return res.status(400).json({
                message: "Status must be PENDING or COMPLETED",
            });
        }

        // VALIDATE PRIORITY
        const validPriorities = ["LOW", "MEDIUM", "HIGH"];

        if (priority && !validPriorities.includes(priority.toUpperCase())) {
            return res.status(400).json({
                message: "Priority must be LOW, MEDIUM, or HIGH",
            });
        }

        // VALIDATE DUE DATE
        if (dueDate && isNaN(new Date(dueDate).getTime())) {
            return res.status(400).json({
                message: "Invalid due date",
            });
        }

        // UPDATE TASK
        const updatedTask = await prisma.task.update({
            where: {
                id,
            },

            data: {
                ...(title !== undefined && {
                    title: title.trim(),
                }),

                ...(description !== undefined && {
                    description,
                }),

                ...(status !== undefined && {
                    status: status.toUpperCase(),
                }),

                ...(priority !== undefined && {
                    priority: priority.toUpperCase(),
                }),

                ...(category !== undefined && {
                    category,
                }),

                ...(dueDate !== undefined && {
                    dueDate: dueDate ? new Date(dueDate) : null,
                }),
            },
        });

        res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // VALIDATE ID
        if (isNaN(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        // CHECK IF TASK EXISTS
        const existingTask = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // DELETE TASK
        await prisma.task.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// MARK TASK AS COMPLETED
const completeTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // VALIDATE ID
        if (isNaN(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        // CHECK IF TASK EXISTS
        const existingTask = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // UPDATE STATUS
        const updatedTask = await prisma.task.update({
            where: {
                id,
            },

            data: {
                status: "COMPLETED",
            },
        });

        res.status(200).json({
            message: "Task marked as completed",
            data: updatedTask,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// MARK TASK AS PENDING
const pendingTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // VALIDATE ID
        if (isNaN(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        // CHECK IF TASK EXISTS
        const existingTask = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // UPDATE STATUS
        const updatedTask = await prisma.task.update({
            where: {
                id,
            },

            data: {
                status: "PENDING",
            },
        });

        res.status(200).json({
            message: "Task marked as pending",
            data: updatedTask,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    completeTask,
    pendingTask,
};