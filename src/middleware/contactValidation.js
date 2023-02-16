const { body, validationResult } = require("express-validator");
/**
 *
 * @returns returns an array of validation rules for the email and text fields
 */
const contactValidationRules = () => {
  return [
    body("email").exists().withMessage("must be at least 5 chars long"),
    body("text")
      .exists()
      .withMessage("must be at least 20 chars or more then it"),
  ];
};
/**
 *
 * @param  req  Express request object.
 * @param  res Express response object.
 * @param  next Express next middleware function.
 * @returns Returns the next middleware function if the data is valid, otherwise returns an error response.
 */
const contactValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
const contactValidator = {
  contactValidationRules,
  contactValidate,
};
module.exports = { contactValidator };
