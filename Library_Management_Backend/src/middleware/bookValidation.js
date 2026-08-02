const { z } = require("zod");

// BOOK VALIDATION SCHEMA
const bookValidationSchema = z.object({

    title: z
        .string()
        .min(1, "Title is required"),

    isbn: z
        .string()
        .regex(
            /^\d{13}$/,
            "ISBN must contain exactly 13 digits"
        ),

    publishedYear: z
        .coerce
        .number()
        .int(),

    totalCopies: z
        .coerce
        .number()
        .int()
        .min(1, "Total copies must be at least 1"),

    authorId: z
        .coerce
        .number()
        .int()
        .positive("Author ID must be a positive number"),

});

// BOOK VALIDATION MIDDLEWARE
const validateBook = (req, res, next) => {
    try {

        // Validate request body
        const validatedData = bookValidationSchema.parse(req.body);

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

module.exports = validateBook;