const express = require("express");
const router = express.Router();
const { formValidation } = require("../middleware/formValidation");
const { profileController } = require("../controller/myProfileController");
// Update profile by ID
router.put(
    "/api/myprofile/update/:id",
    formValidation.myProfileValidationRules(),
    profileController.updateProfileById
);
// Get profile by ID
router.get("/api/myprofile/:id", profileController.getProfileById);
module.exports = router;
