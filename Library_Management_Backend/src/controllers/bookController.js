const prisma = require("../config/db");


// CREATE BOOK
const createBook = async (req, res) => {
    try {

        // Get data from request body
        const {
            title,
            isbn,
            publishedYear,
            totalCopies,
            authorId,
        } = req.body;

        // Check if author exists
        const author = await prisma.author.findUnique({
            where: {
                id: parseInt(authorId),
            },
        });

        if (!author) {
            return res.status(404).json({
                message: "Author not found",
            });
        }

        // Create book
        const book = await prisma.book.create({
            data: {
                title,
                isbn,
                publishedYear,
                totalCopies,
                availableCopies: totalCopies,
                authorId: parseInt(authorId),
            },
        });

        res.status(201).json({
            message: "Book created successfully",
            data: book,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// GET ALL BOOKS
const getBooks = async (req, res) => {
    try {

        const books = await prisma.book.findMany({
            include: {
                author: true,
            },
        });

        res.status(200).json({
            message: "Books fetched successfully",
            data: books,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// GET BOOK BY ID
const getBookById = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);

        // Check valid ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid book ID",
            });
        }

        // Find book
        const book = await prisma.book.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });

        // If book does not exist
        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.status(200).json({
            message: "Book fetched successfully",
            data: book,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// UPDATE BOOK
const updateBook = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);

        // Get data from request body
        const {
            title,
            isbn,
            publishedYear,
            totalCopies,
            authorId,
        } = req.body;

        // Check valid ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid book ID",
            });
        }

        // Check if book exists
        const existingBook = await prisma.book.findUnique({
            where: {
                id,
            },
        });

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        // Check if author exists
        const author = await prisma.author.findUnique({
            where: {
                id: parseInt(authorId),
            },
        });

        if (!author) {
            return res.status(404).json({
                message: "Author not found",
            });
        }

        // Update book
        const updatedBook = await prisma.book.update({
            where: {
                id,
            },
            data: {
                title,
                isbn,
                publishedYear,
                totalCopies,
                authorId: parseInt(authorId),
            },
        });

        res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// DELETE BOOK
const deleteBook = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);

        // Check valid ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid book ID",
            });
        }

        // Check if book exists
        const existingBook = await prisma.book.findUnique({
            where: {
                id,
            },
        });

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        // Delete book
        await prisma.book.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            message: "Book deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// SEARCH BOOKS BY TITLE
const searchBooks = async (req, res) => {
    try {

        // Get search text from query
        const { title } = req.query;

        // Check if title is provided
        if (!title) {
            return res.status(400).json({
                message: "Please provide a title to search",
            });
        }

        // Search books
        const books = await prisma.book.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
            include: {
                author: true,
            },
        });

        res.status(200).json({
            message: "Books searched successfully",
            data: books,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// FILTER BOOKS BY AUTHOR
const filterBooks = async (req, res) => {
    try {

        // Get author ID from query
        const { authorId } = req.query;

        // Convert to number
        const id = parseInt(authorId);

        // Check valid author ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid author ID",
            });
        }

        // Find books by author
        const books = await prisma.book.findMany({
            where: {
                authorId: id,
            },
            include: {
                author: true,
            },
        });

        res.status(200).json({
            message: "Books filtered successfully",
            data: books,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// PAGINATE BOOKS
const paginateBooks = async (req, res) => {
    try {

        // Get page and limit
        const {
            page = 1,
            limit = 5,
        } = req.query;

        // Convert to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Check valid numbers
        if (
            isNaN(pageNumber) ||
            isNaN(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1
        ) {
            return res.status(400).json({
                message: "Page and limit must be positive numbers",
            });
        }

        // Calculate skip
        const skip = (pageNumber - 1) * limitNumber;

        // Get books
        const books = await prisma.book.findMany({
            include: {
                author: true,
            },
            skip,
            take: limitNumber,
            orderBy: {
                createdAt: "desc",
            },
        });

        // Get total books
        const totalBooks = await prisma.book.count();

        // Calculate total pages
        const totalPages = Math.ceil(
            totalBooks / limitNumber
        );

        res.status(200).json({
            message: "Books fetched successfully",
            data: books,
            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalBooks,
                totalPages,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks,
    filterBooks,
    paginateBooks
};