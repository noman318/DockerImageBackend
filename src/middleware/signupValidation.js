const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    // username must be an email
    body("firstname").exists().withMessage("must be at least 5 chars long"),
    // password must be at least 5 chars long
    body("email").exists().withMessage("must be at least 5 chars long"),
    body("lastname").exists().withMessage("must be at least 5 chars long"),
    body("mobilenumber").exists().withMessage("must be at least 5 chars long"),
    body("username").exists().withMessage("must be at least 5 chars long"),
    body("password").exists().withMessage("must be at least 5 chars long"),
    body("location").exists().withMessage("must be at least 5 chars long"),
  ];
};
/**
 * Validates the request and sends error response if necessary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns  The response object with error information if errors exist.
 */
const validate = (req, res, next) => {
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

module.exports = {
  userValidationRules,
  validate,
};
