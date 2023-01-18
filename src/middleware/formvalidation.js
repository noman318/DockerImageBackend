const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("firstname").exists().withMessage("firstname is missing"),
    body("email").exists().withMessage("email is missing"),
    body("lastname").exists().withMessage("lastname is missing"),
    body("mobilenumber").exists().withMessage("mobilenumber is missing"),
    body("username").exists().withMessage("username is missing"),
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
    body("oldpass").exists().withMessage("oldpass is missing"),
    body("newpass").exists().withMessage("newpass is missing"),
    body("id").exists().withMessage("id is missing"),
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

module.exports = {
  userValidationRules,
  validate,
  loginValidationRules,
  resetValidationRules,
  changepassValidationRules,
};
