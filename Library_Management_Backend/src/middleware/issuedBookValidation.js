const { z } = require("zod");

// ISSUED BOOK VALIDATION SCHEMA
const issuedBookValidationSchema = z.object({

    bookId: z
        .coerce
        .number()
        .int()
        .positive("Book ID must be a positive number"),

    memberId: z
        .coerce
        .number()
        .int()
        .positive("Member ID must be a positive number"),

    dueDate: z
        .coerce
        .date(),
});

// ISSUED BOOK VALIDATION MIDDLEWARE
const validateIssuedBook = (req, res, next) => {
    try {

        // Validate request body
        const validatedData = issuedBookValidationSchema.parse(req.body);

        // Store validated data
        req.body = validatedData;

        // Continue to controller
        next();

    } catch (error) {

        return res.status(400).json({
            message: "Validation failed",
            errors: error.errors,
        });

    }
};

module.exports = validateIssuedBook;