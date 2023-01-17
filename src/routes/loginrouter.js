const express = require("express");
const router = express.Router();
const {
  userValidationRules,
  validate,
} = require("../middleware/signupvalidation");
const { signUp, signIn } = require("../controller/authController");
const { resetpassword } = require("../controller/resetpassword");
const { changepassword } = require("../controller/changepassword");
router.post("/api/signup", userValidationRules(), validate, signUp);
router.post("/api/signin", signIn);
router.post("/api/resetpassword", resetpassword);
router.post("/api/changepassword", changepassword);
module.exports = router;
