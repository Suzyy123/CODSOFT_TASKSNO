const express = require("express");
const { createBook, getBooks, getBookById, updateBook, deleteBook, searchBooks, filterBooks, paginateBooks } = require("../controllers/bookController");
const validateBook = require("../middleware/bookValidation");

const router = express.Router();

router.post("/", validateBook, createBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/filter", filterBooks);
router.get("/paginate", paginateBooks);
router.get("/:id", getBookById);
router.put("/:id", validateBook, updateBook);
router.delete("/:id", deleteBook);


module.exports = router;