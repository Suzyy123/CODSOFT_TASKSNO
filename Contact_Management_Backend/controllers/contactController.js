const Contact = require("../models/Contact");

// CREATE
const createContact = async (req, res) => {
    try {
        const { name, email, phone, address, company } = req.body;

        const existingContact = await Contact.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingContact) {
            return res.status(409).json({
                success: false,
                message: "Contact with this email or phone already exists"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            address,
            company
        });

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create contact",
            error: error.message
        });
    }
};

// GET ALL + SEARCH + SORTING + PAGINATION
const getContacts = async (req, res) => {
    try {
        const {
            search,
            sort = "name",
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.min(Math.max(Number(limit), 1), 100);
        const skip = (pageNumber - 1) * limitNumber;

        const sortField = sort.startsWith("-")
            ? sort.substring(1)
            : sort;

        const sortOrder = sort.startsWith("-") ? -1 : 1;

        const allowedSortFields = [
            "name",
            "email",
            "phone",
            "company",
            "createdAt"
        ];

        if (!allowedSortFields.includes(sortField)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sort field"
            });
        }

        const contacts = await Contact.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limitNumber);

        const totalContacts = await Contact.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: contacts.length,
            total: totalContacts,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(totalContacts / limitNumber),
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve contacts",
            error: error.message
        });
    }
};

// GET ONE
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid contact ID"
        });
    }
};

// UPDATE
const updateContact = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (email || phone) {
            const duplicate = await Contact.findOne({
                $or: [
                    ...(email ? [{ email }] : []),
                    ...(phone ? [{ phone }] : [])
                ],
                _id: { $ne: req.params.id }
            });

            if (duplicate) {
                return res.status(409).json({
                    success: false,
                    message: "Another contact already uses this email or phone"
                });
            }
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update contact",
            error: error.message
        });
    }
};

// DELETE
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid contact ID"
        });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};