const express = require("express");
const router = express.Router();
const { formValidation } = require("../middleware/formValidation");
const { authController } = require("../controller/authController");
// Define the sign-up route
router.post(
  "/api/signUp",
  formValidation.userValidationRules(),
  formValidation.validate,
  authController.signUp
);
// Define the sign-in route
router.post(
  "/api/signIn",
  formValidation.loginValidationRules(),
  formValidation.validate,
  authController.signIn
);
// Define the reset password route
router.post(
  "/api/resetPassword",
  formValidation.resetValidationRules(),
  formValidation.validate,
  authController.resetPassword
);

// Define the change password route
router.post(
  "/api/changePassword",
  formValidation.changepassValidationRules(),
  formValidation.validate,
  authController.changePassword
);
module.exports = router;
