const { z } = require("zod");

// MEMBER VALIDATION SCHEMA
const memberValidationSchema = z.object({

    name: z
        .string()
        .min(2, "Name must be at least 2 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    phone: z
        .string()
        .min(10, "Invalid phone number"),

});



// MEMBER VALIDATION MIDDLEWARE
const validateMember = (req, res, next) => {
    try {

        // Validate request body
        const validatedData = memberValidationSchema.parse(req.body);

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

module.exports = validateMember;