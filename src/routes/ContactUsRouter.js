const express = require("express");
const { contactController } = require("../controller/contactusController");

const router = express.Router();
router.post(
    "/api/contactus",
    contactController.postContactUs
);
router.get(
    "/api/getAll/contactus",
    contactController.getContactUs
);
module.exports = router;