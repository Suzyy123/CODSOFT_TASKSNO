const { body } = require("express-validator");

const studentValidation = [
    body("fname")
        .notEmpty()
        .withMessage("First name is required"),

    body("lname")
        .notEmpty()
        .withMessage("Last name is required"),

    body("email")
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("age")
        .isInt({ min: 1 })
        .withMessage("Age must be a valid positive number"),
];

module.exports = studentValidation;