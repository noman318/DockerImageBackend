const { body, validationResult, } = require("express-validator");
const myBookingReqBody = () => {
  return [
    body("userId").exists().contains().isLength({min:10}).withMessage("Should be a ID"),
    body("eventId").exists().contains().isLength({min:10}).withMessage("Should be a ID"),
  ];
};

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

const bookingValidationMiddleware={
    myBookingReqBody,
    validate
}

module.exports={bookingValidationMiddleware}