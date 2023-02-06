const { body, validationResult ,param} = require("express-validator");
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
const updateValidation = () => {
  return [
    param("id").exists().withMessage("id is missing"),
  ];
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
  onGoingValidation,
  futureValidation,
  pastValidation,
  validate,
};

module.exports = { eventsValidation };
