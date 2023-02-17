const { body, validationResult } = require("express-validator");
/**
 * @description user validation rules
 * @returns The response object with error information if errors exist.
 */
const deactivateUserRules = () => {
  return [
    body("id").exists().withMessage("Id is missing"),
    body("isActive").exists().withMessage("IsActive is missing"),
  ];
};

const getUserByNameRules = () => {
  return [
    body("name").exists().withMessage("Name is missing"),
    body("page").exists().withMessage("Page is missing"),
  ];
};

const updateRoleRules = () => {
  return [
    body("id").exists().withMessage("Id is missing"),
    body("role").exists().withMessage("Role is missing"),
    body("isActive").exists().withMessage("IsActive is missing"),
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

const userValidation = {
  deactivateUserRules,
  getUserByNameRules,
  updateRoleRules,
  validate,
};
module.exports = {
  userValidation,
};
