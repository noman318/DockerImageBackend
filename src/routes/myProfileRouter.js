const express = require("express");
const router = express.Router();
const { updateProfileById, profileController } = require("../controller/myProfileController");
router.put("/api/myprofile/update/:id", profileController.updateProfileById);
router.get("/api/myprofile/:id", profileController.getProfileById);
module.exports = router;
