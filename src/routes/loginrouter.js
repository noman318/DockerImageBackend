const express = require("express");
const router = express.Router();
const { formValidation } = require("../middleware/formValidation");
const { authController } = require("../controller/authController");
router.post(
  "/api/signup",
  formValidation.userValidationRules(),
  formValidation.validate,
  authController.signUp
);
router.post(
  "/api/signin",
  formValidation.loginValidationRules(),
  formValidation.validate,
  authController.signIn
);
router.post(
  "/api/resetpassword",
  formValidation.resetValidationRules(),
  formValidation.validate,
  authController.resetPassword
);
router.post(
  "/api/changepassword",
  formValidation.changepassValidationRules(),
  formValidation.validate,
  authController.changePassword
);
module.exports = router;
