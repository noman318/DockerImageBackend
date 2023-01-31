const express=require('express');
const { myBooking } = require('../controller/BookingController');
const { eventBookingExecutor } = require('../controller/eventBookingController');
const { bookingValidationMiddleware } = require('../middleware/bookingMiddleware');
const { paymentRequestValidationMiddleware } = require('../middleware/paymentValidationMiddleware');

const router = express.Router();

router.post('/pay',
paymentRequestValidationMiddleware.paymentReqBody(),
paymentRequestValidationMiddleware.validate,
eventBookingExecutor.eventBooking);

router.post('/success',eventBookingExecutor.successEventBooking);
router.post('/cancel',eventBookingExecutor.failedEventBooking);

router.post("/booking",
bookingValidationMiddleware.myBookingReqBody(),
bookingValidationMiddleware.validate,
myBooking)

module.exports = router;
