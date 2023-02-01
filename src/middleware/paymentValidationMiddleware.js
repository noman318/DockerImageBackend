const { body, validationResult, } = require("express-validator");
const paymentReqBody = () => {
  return [
    body("").isArray({min:1}).exists().withMessage("Should be a array of object"),
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

const paymentRequestValidationMiddleware={
    paymentReqBody,
    validate
}

module.exports={paymentRequestValidationMiddleware}