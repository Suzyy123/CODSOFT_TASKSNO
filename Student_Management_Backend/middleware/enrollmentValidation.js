const { body } = require("express-validator");

const enrollmentValidation = [
    body("student_id")
        .isInt({ min: 1 })
        .withMessage("Student ID must be a valid number"),

    body("course_id")
        .isInt({ min: 1 })
        .withMessage("Course ID must be a valid number"),
];

module.exports = enrollmentValidation;