const Enrollment = require("../models/Enrollment");

// Get all enrollments
const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();

        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Create enrollment
const createEnrollment = async (req, res) => {
    try {
        const { student_id, course_id } = req.body;

        const enrollment = await Enrollment.create({
            student_id,
            course_id,
        });

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update enrollment
const updateEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const { student_id, course_id } = req.body;

        const enrollment = await Enrollment.findByPk(id);

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        await enrollment.update({
            student_id,
            course_id,
        });

        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete enrollment
const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;

        const enrollment = await Enrollment.findByPk(id);

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        await enrollment.destroy();

        res.status(200).json({
            message: "Enrollment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getEnrollments,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
};