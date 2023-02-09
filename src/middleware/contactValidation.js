const { body, validationResult } = require("express-validator");
const contactValidationRules = () => {
  return [
    body("email").exists().withMessage("must be at least 5 chars long"),
    body("text").exists().withMessage("must be at least 20 chars or more then it"),
];
};
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
    contactValidate
};
module.exports = { contactValidator }
