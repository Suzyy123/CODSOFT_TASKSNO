const express = require("express");
const { createMember, getMembers, getMemberById, updateMember, deleteMember, searchMembers, filterMembers, paginateMembers } = require("../controllers/memberController");
const validateMember = require("../middleware/memberValidation");

const router = express.Router();

router.post("/", validateMember, createMember);
router.get("/", getMembers);
router.get("/search", searchMembers);
// GET http://localhost:5000/members/filter?hasIssuedBooks=true
router.get("/filter", filterMembers);
router.get("/paginate", paginateMembers);
router.get("/:id", getMemberById);
router.put("/:id", validateMember, updateMember);
router.delete("/:id", deleteMember);


module.exports = router;