const prisma = require("../config/db.js");

// CREATE / ISSUE BOOK
const createIssuedBook = async (req, res) => {
    try {

        // Get data from request body
        const {
            bookId,
            memberId,
            dueDate,
        } = req.body;


    
        // CHECK IF BOOK EXISTS
    
        const book = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }


    
        // CHECK IF MEMBER EXISTS
        const member = await prisma.member.findUnique({
            where: {
                id: memberId,
            },
        });

        if (!member) {
            return res.status(404).json({
                message: "Member not found",
            });
        }


    
        // CHECK IF BOOK IS AVAILABLE
        if (book.availableCopies <= 0) {
            return res.status(400).json({
                message: "Book is not available",
            });
        }


    
        // PREVENT DUPLICATE BOOK ISSUE
        const existingIssue = await prisma.issuedBook.findFirst({
            where: {
                bookId: bookId,
                memberId: memberId,
                status: "ISSUED",
            },
        });

        if (existingIssue) {
            return res.status(400).json({
                message: "This member already has this book issued",
            });
        }


    
        // CREATE ISSUED BOOK RECORD
        const issuedBook = await prisma.issuedBook.create({
            data: {
                bookId,
                memberId,
                dueDate,
            },
        });


    
        // DECREASE AVAILABLE COPIES BY 1
        await prisma.book.update({
            where: {
                id: bookId,
            },
            data: {
                availableCopies: {
                    decrement: 1,
                },
            },
        });


    
        // SUCCESS RESPONSE
        res.status(201).json({
            message: "Book issued successfully",
            data: issuedBook,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// GET ALL ISSUED BOOKS
const getIssuedBooks = async (req, res) => {
    try {

        const issuedBooks = await prisma.issuedBook.findMany({
            include: {
                book: true,
                member: true,
            },
            orderBy: {
                issuedAt: "desc",
            },
        });


        res.status(200).json({
            message: "Issued books fetched successfully",
            data: issuedBooks,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// GET ISSUED BOOK BY ID
const getIssuedBookById = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);


    
        // CHECK VALID ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid issued book ID",
            });
        }


    
        // FIND ISSUED BOK
        const issuedBook = await prisma.issuedBook.findUnique({
            where: {
                id,
            },
            include: {
                book: true,
                member: true,
            },
        });


    
        // CHECK IF RECORD EXISTS
        if (!issuedBook) {
            return res.status(404).json({
                message: "Issued book record not found",
            });
        }


        res.status(200).json({
            message: "Issued book fetched successfully",
            data: issuedBook,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// RETURN BOOK
const returnBook = async (req, res) => {
    try {

        // Get ID from URL
        const id = parseInt(req.params.id);


    
        // CHECK VALID ID
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid issued book ID",
            });
        }


    
        // FIND ISSUED BOOK
        const issuedBook = await prisma.issuedBook.findUnique({
            where: {
                id,
            },
        });


    
        // CHECK IF RECORD EXISTS
        if (!issuedBook) {
            return res.status(404).json({
                message: "Issued book record not found",
            });
        }


    
        // CHECK IF BOOK IS ALREADY RETURNED
        if (issuedBook.status === "RETURNED") {
            return res.status(400).json({
                message: "Book has already been returned",
            });
        }


    
        // UPDATE ISSUED BOOK
        const returnedBook = await prisma.issuedBook.update({
            where: {
                id,
            },
            data: {
                returnedAt: new Date(),
                status: "RETURNED",
            },
        });


    
        // INCREASE AVAILABLE COPIES BY 1
        await prisma.book.update({
            where: {
                id: issuedBook.bookId,
            },
            data: {
                availableCopies: {
                    increment: 1,
                },
            },
        });


    
        // SUCCESS RESPONSE
        res.status(200).json({
            message: "Book returned successfully",
            data: returnedBook,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET OVERDUE BOOKS
// WITH OVERDUE DAYS AND LATE FEE
const getOverdueBooks = async (req, res) => {
    try {

        // Get current date
        const currentDate = new Date();


    
        // FIND OVERDUE BOOKS
        const overdueBooks = await prisma.issuedBook.findMany({
            where: {
                status: "ISSUED",
                dueDate: {
                    lt: currentDate,
                },
            },
            include: {
                book: true,
                member: true,
            },
            orderBy: {
                dueDate: "asc",
            },
        });

    
        // CALCULATE OVERDUE DAYS
        const data = overdueBooks.map((issuedBook) => {

            // Calculate difference between
            // current date and due date
            const difference =
                currentDate - new Date(issuedBook.dueDate);


            // Convert milliseconds to days
            const overdueDays = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            );
        
            // LATE FEE
            // £10 PER OVERDUE DAY
            const lateFee = overdueDays * 10;
            return {
                ...issuedBook,
                overdueDays,
                lateFee,
            };

        });
    
        res.status(200).json({
            message: "Overdue books fetched successfully",
            data,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


module.exports = {
    createIssuedBook,
    getIssuedBooks,
    getIssuedBookById,
    returnBook,
    getOverdueBooks,
};