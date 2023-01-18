const express = require("express");
const router = express.Router();
const {
  userValidationRules,
  loginValidationRules,
  resetValidationRules,
  changepassValidationRules,
  validate,
} = require("../middleware/formvalidation");
const {
  signUp,
  signIn,
  resetpassword,
  changepassword,
} = require("../controller/authController");
router.post("/api/signup", userValidationRules(), validate, signUp);
router.post("/api/signin", loginValidationRules(), validate, signIn);
router.post(
  "/api/resetpassword",
  resetValidationRules(),
  validate,
  resetpassword
);
router.post(
  "/api/changepassword",
  changepassValidationRules(),
  validate,
  changepassword
);
module.exports = router;
