const express = require("express");
const router = express.Router();
const courseValidation = require("../middleware/courseValidation");
const validate = require("../middleware/validate");
const {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/courseController");

router.get("/getCourses", 
    validate,
    courseValidation,
    getCourses);
router.post("/createCourses", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;