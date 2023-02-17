const express = require("express");
const userController = require("../controller/userController");
const { userValidation } = require("../middleware/userValidation");
const router = express.Router();
// GET all user data
router.get("/getalluser", userController.getAllUserData);
// Deactivate a user
router.post(
  "/deactiveuser",
  userValidation.deactivateUserRules(),
  userValidation.validate,
  userController.deactivateUser
);
// GET user by name
router.post(
  "/getuserbyname",
  userValidation.getUserByNameRules(),
  userValidation.validate,
  userController.getUserByName
);
// Update user role and Status
router.put(
  "/updaterole",
  userValidation.updateRoleRules(),
  userValidation.validate,
  userController.updateRole
);

module.exports = router;
