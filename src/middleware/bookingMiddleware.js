const { body, validationResult } = require("express-validator");
/**
 *
 * @return  an array of validation rules using the express-validator library
 * The validation rules are used to validate the request body for a booking operation.
 */
const myBookingReqBody = () => {
  return [
    body("userId")
      .exists()
      .contains()
      .isLength({ min: 10 })
      .withMessage("Should be a ID"),
    body("eventId")
      .exists()
      .contains()
      .isLength({ min: 10 })
      .withMessage("Should be a ID"),
  ];
};
/**
 *
 * @param  req represents the request object, which contains information about the incoming HTTP request
 * @param  res represents the response object, which is used to send a response back to the client.
 * @param  next is a function that is called to pass control to the next middleware function in the application's request-response cycle
 * @returns
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

const bookingValidationMiddleware = {
  myBookingReqBody,
  validate,
};

module.exports = { bookingValidationMiddleware };
