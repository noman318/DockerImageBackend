const express = require("express");
const router = express.Router();
const { formValidation } = require("../middleware/formValidation");
const { authController } = require("../controller/authController");
router.post(
  "/api/signUp",
  formValidation.userValidationRules(),
  formValidation.validate,
  authController.signUp
);
router.post(
  "/api/signIn",
  formValidation.loginValidationRules(),
  formValidation.validate,
  authController.signIn
);
router.post(
  "/api/resetPassword",
  formValidation.resetValidationRules(),
  formValidation.validate,
  authController.resetPassword
);
router.post(
  "/api/changePassword",
  formValidation.changepassValidationRules(),
  formValidation.validate,
  authController.changePassword
);
module.exports = router;
