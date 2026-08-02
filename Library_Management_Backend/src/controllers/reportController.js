const prisma = require("../config/db");

// LIBRARY REPORT
const getLibraryReport = async (req, res) => {
    try {
        // TOTAL BOOKS
        const totalBooks = await prisma.book.count();
        
        // TOTAL AUTHORS
        const totalAuthors = await prisma.author.count();

        // TOTAL MEMBERS
        const totalMembers = await prisma.member.count();
        
        // TOTAL ISSUED RECORDS
        const totalIssuedBooks = await prisma.issuedBook.count();
        
        // CURRENTLY ISSUED BOOKS
        const currentlyIssued = await prisma.issuedBook.count({
            where: {
                status: "ISSUED",
            },
        });

        
        // RETURNED BOOKS    
        const returnedBooks = await prisma.issuedBook.count({
            where: {
                status: "RETURNED",
            },
        });

        // OVERDUE BOOKS
        const overdueBooks = await prisma.issuedBook.count({
            where: {
                status: "ISSUED",
                dueDate: {
                    lt: new Date(),
                },
            },
        });


        res.status(200).json({
            message: "Library report generated successfully",
            data: {
                totalBooks,
                totalAuthors,
                totalMembers,
                totalIssuedBooks,
                currentlyIssued,
                returnedBooks,
                overdueBooks,
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
    getLibraryReport,
};