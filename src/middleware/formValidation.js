const { body, validationResult } = require("express-validator");
/**
 * @description user validation rules 
 * @returns with the error mesage if the field is missing 
 */
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
/**
 * @description login validation rule for email and password 
 * @returns if the email dose not  exists it provides with an error message
 */
const loginValidationRules = () => {
  return [
    body("email").exists().withMessage("email is missing"),
    body("password").exists().withMessage("password is missing"),
  ];
};
/**
 * @description rule for reset password 
 */
const resetValidationRules = () => {
  return [body("email").exists().withMessage("email is missing")];
};
/**
 * @description validation for change password 
 * @returns if the fields are missing for old password , new password or id it provides and error message  
 */
const changepassValidationRules = () => {
  return [
    body("oldPassword").exists().withMessage("oldpassword is missing"),
    body("newPassword").exists().withMessage("newpassword is missing"),
    body("id").exists().withMessage("id is missing"),
  ];
};
/**
 * @description validation ruls for my profile 
 * @returns if any fild is empty it shows error 
 */
const myProfileValidationRules = () => {
  return [
    body("firstName").exists().withMessage("firstname is missing"),
    body("email").exists().withMessage("email is missing"),
    body("lastName").exists().withMessage("lastname is missing"),
    body("mobileNumber").exists().withMessage("mobilenumber is missing"),
    body("userName").exists().withMessage("username is missing"),
  ];
};
/**
 * 
 * @param  req Express request object

 * @param  res Express response object
 * @param  next Express next function
 * @returns Either calls the next middleware or returns response with errors
 */
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
  myProfileValidationRules,
};

module.exports = { formValidation };
