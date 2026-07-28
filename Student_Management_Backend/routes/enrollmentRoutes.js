const express = require("express");
const router = express.Router();
const enrollmentValidation = require("../middleware/enrollmentValidation");
const validate = require("../middleware/validate");
const {
    getEnrollments,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
} = require("../controllers/enrollmentController");

router.get("/getEnrollments", getEnrollments);
router.post(
    "/createEnrollments", 
    validate,
    enrollmentValidation,
    createEnrollment);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);
module.exports = router;