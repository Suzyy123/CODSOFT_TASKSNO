const prisma = require("../config/db");


// CREATE AUTHOR
const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;

        const author = await prisma.author.create({
            data: {
                name,
                bio,
            },
        });

        res.status(201).json({
            message: "Author created successfully",
            data: author,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// GET ALL AUTHORS
const getAuthors = async (req, res) => {
    try {

        const authors = await prisma.author.findMany();

        res.status(200).json({
            message: "Authors fetched successfully",
            data: authors,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};



// GET AUTHOR BY ID
const getAuthorById = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);

        // Check valid ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid author ID",
            });
        }

        // Find author
        const author = await prisma.author.findUnique({
            where: {
                id,
            },
        });

        // If author does not exist
        if (!author) {
            return res.status(404).json({
                message: "Author not found",
            });
        }

        res.status(200).json({
            message: "Author fetched successfully",
            data: author,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// UPDATE AUTHOR
const updateAuthor = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);

        // Get data from request body
        const { name, bio } = req.body;

        // Check valid ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid author ID",
            });
        }

        // Check if author exists
        const existingAuthor = await prisma.author.findUnique({
            where: {
                id,
            },
        });

        if (!existingAuthor) {
            return res.status(404).json({
                message: "Author not found",
            });
        }

        // Update author
        const updatedAuthor = await prisma.author.update({
            where: {
                id,
            },
            data: {
                name,
                bio,
            },
        });

        res.status(200).json({
            message: "Author updated successfully",
            data: updatedAuthor,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// DELETE AUTHOR
const deleteAuthor = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);

        // Check valid ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid author ID",
            });
        }

        // Check if author exists
        const existingAuthor = await prisma.author.findUnique({
            where: {
                id,
            },
        });

        if (!existingAuthor) {
            return res.status(404).json({
                message: "Author not found",
            });
        }

        // Delete author
        await prisma.author.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            message: "Author deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
};