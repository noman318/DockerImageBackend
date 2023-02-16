const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
// GET all user data
router.get("/getalluser", userController.getAllUserData);
// Deactivate a user
router.post("/deactiveuser", userController.deactivateUser);

router.get("/getalluser", userController.getAllUserData);
router.post("/deactiveuser", userController.deactivateUser);
// GET user by name
router.post("/getuserbyname", userController.getUserByName);
router.put("/updaterole", userController.updateRole);

module.exports = router;
