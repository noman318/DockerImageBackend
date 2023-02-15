const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
// GET all user data
router.get("/getalluser", userController.getAllUserData);
// Deactivate a user
router.post("/deactiveuser", userController.deactivateUser);

// GET user by name
router.get("/getuserbyname", userController.getUserByName);

module.exports = router;
