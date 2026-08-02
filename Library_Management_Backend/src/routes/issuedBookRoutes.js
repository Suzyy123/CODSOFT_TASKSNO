const express = require("express");

const {
    createIssuedBook,
    getIssuedBooks,
    getIssuedBookById,
    returnBook,
    getOverdueBooks,
} = require("../controllers/issuedBookController");

const validateIssuedBook = require("../middleware/issuedBookValidation");

const router = express.Router();


router.post("/",validateIssuedBook,createIssuedBook);
router.get("/",getIssuedBooks);
router.get("/overdue", getOverdueBooks);
router.get("/:id", getIssuedBookById);
router.put("/:id/return", returnBook);

module.exports = router;