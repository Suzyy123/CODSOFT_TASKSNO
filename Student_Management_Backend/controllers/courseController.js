const Course = require("../models/Course");

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Create course
const createCourse = async (req, res) => {
    try {
        const { course_name } = req.body;

        const course = await Course.create({
            course_name,
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update course
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name } = req.body;

        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        await course.update({
            course_name,
        });

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        await course.destroy();

        res.status(200).json({
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};