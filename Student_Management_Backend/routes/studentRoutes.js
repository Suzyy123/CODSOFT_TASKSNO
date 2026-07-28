const express = require("express");
const router = express.Router();
const studentValidation = require("../middleware/studentValidation");
const validate = require("../middleware/validate");
const {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
        } = require("../controllers/studentController");

router.get("/getStudents", getStudents);
router.post(
    "/createStudents", 
    validate,
    studentValidation,
    createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;