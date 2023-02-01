const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("firstName").exists().withMessage("firstname is missing"),
    body("email").exists().withMessage("email is missing"),
    body("lastName").exists().withMessage("lastname is missing"),
    body("mobileNumber").exists().withMessage("mobilenumber is missing"),
    body("userName").exists().withMessage("username is missing"),
    body("password").exists().withMessage("password is missing"),
    body("location").exists().withMessage("location is missing"),
  ];
};
const loginValidationRules = () => {
  return [
    body("email").exists().withMessage("email is missing"),
    body("password").exists().withMessage("password is missing"),
  ];
};
const resetValidationRules = () => {
  return [body("email").exists().withMessage("email is missing")];
};
const changepassValidationRules = () => {
  return [
    body("oldPassword").exists().withMessage("oldpassword is missing"),
    body("newPassword").exists().withMessage("newpassword is missing"),
    body("id").exists().withMessage("id is missing"),
  ];
};

const myProfileValidationRules = () => {
  return [
    body("firstName").exists().withMessage("firstname is missing"),
    body("email").exists().withMessage("email is missing"),
    body("lastName").exists().withMessage("lastname is missing"),
    body("mobileNumber").exists().withMessage("mobilenumber is missing"),
    body("userName").exists().withMessage("username is missing")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array()
    .forEach((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
const formValidation = {
  userValidationRules,
  validate,
  loginValidationRules,
  resetValidationRules,
  changepassValidationRules,
  myProfileValidationRules
};

module.exports = { formValidation };
