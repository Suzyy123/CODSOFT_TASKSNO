const express = require("express");

const {
    getLibraryReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/", getLibraryReport);

module.exports = router;