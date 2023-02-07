const express = require("express");
const { contactController } = require("../controller/contactusController");
const { contactValidator } = require("../middleware/contactValidation");


const router = express.Router();
router.post(
    "/api/contactus",
    contactController.postContactUs,
    contactValidator.contactValidationRules(),
    contactValidator.contactValidate
);
router.get("/api/getAll/contactus", contactController.getContactUs);
module.exports = router;
