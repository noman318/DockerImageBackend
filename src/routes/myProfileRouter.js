const express = require("express");
const router = express.Router();
const { formValidation } = require("../middleware/formValidation");
const {profileController } = require("../controller/myProfileController");
router.put("/api/myprofile/update/:id",formValidation.myProfileValidationRules(),profileController.updateProfileById);
router.get("/api/myprofile/:id",profileController.getProfileById);
module.exports = router;
