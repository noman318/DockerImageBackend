const { body, validationResult } = require("express-validator");
const eventValidation = () => {
  return [
    body("threaterId").exists().withMessage("threaterId is missing"),
    body("name").exists().withMessage("name is missing"),
    body("language").exists().withMessage("language is missing"),
    body("location").exists().withMessage("location is missing"),
    body("description").exists().withMessage("description is missing"),
    body("image").exists().withMessage("image is missing"),
    body("seatAvailable").exists().withMessage("seatAvailable is missing"),
    body("price").exists().withMessage("price is missing")
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
const eventsValidation = {
  eventValidation,
  validate,
};

module.exports = { eventsValidation };
