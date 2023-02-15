const { body, validationResult, param } = require("express-validator");
/**
 * Returns an array of validation rules for event creation
 *@returns {Array} Array of validation rules
 */
const eventValidation = () => {
  return [
    body("threaterId").exists().withMessage("threaterId is missing"),
    body("name").exists().withMessage("name is missing"),
    body("language").exists().withMessage("language is missing"),
    body("location").exists().withMessage("location is missing"),
    body("description").exists().withMessage("description is missing"),
    body("seatAvailable").exists().withMessage("seatAvailable is missing"),
    body("price").exists().withMessage("price is missing"),
  ];
};
const updateValidation = () => {
  return [param("id").exists().withMessage("id is missing")];
};
const onGoingValidation = () => {
  return [
    body("filterLanguage").optional(),
    body("filterartist").optional(),
    body("filterlocation").optional(),
    body("filterprice").optional(),
  ];
};
const futureValidation = () => {
  return [
    body("language").optional(),
    body("price").optional(),
    body("location").optional(),
    body("artist").optional(),
  ];
};
const pastValidation = () => {
  return [
    body("language").optional(),
    body("price").optional(),
    body("location").optional(),
    body("artist").optional(),
  ];
};
const getAll = () => {
  return [body("name").optional()];
};
/**
 *
 * @param {*} req The request object.
 * @param {*} res The response object.
 * @param {*} next  The next middleware function.
 * @returns  If there are no validation errors, call the next middleware function, otherwise return an error response.
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
const eventsValidation = {
  updateValidation,
  eventValidation,
  getAll,
  onGoingValidation,
  futureValidation,
  pastValidation,
  getAll,
  validate,
};

module.exports = { eventsValidation };
