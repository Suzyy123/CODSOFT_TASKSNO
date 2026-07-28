const { body } = require("express-validator");

const courseValidation = [
    body("course_name")
        .notEmpty()
        .withMessage("Course name is required"),
];

module.exports = courseValidation;