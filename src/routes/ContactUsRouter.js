const express = require("express");
/**
 * @description Import the contact form controller and validator middleware
 */
const { contactController } = require("../controller/contactusController");
const { contactValidator } = require("../middleware/contactValidation");

const router = express.Router();
/**
 * @description Define a POST route for submitting the contact form data
 */
router.post(
    "/api/contactus",
    contactController.postContactUs,
    contactValidator.contactValidationRules(),
    contactValidator.contactValidate
);
/**
 *@description Define a GET route for retrieving all submitted contact form data
 */
router.get("/api/getAll/contactus", contactController.getContactUs);
module.exports = router;
