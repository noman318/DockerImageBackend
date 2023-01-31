const express=require('express');
const { myBooking,getAllBookings } = require('../controller/bookingController');
const { eventBookingExecutor } = require('../controller/eventBookingController');
const { bookingValidationMiddleware } = require('../middleware/bookingMiddleware');
const { paymentRequestValidationMiddleware } = require('../middleware/paymentValidationMiddleware');

const router = express.Router();

router.post('/pay',
paymentRequestValidationMiddleware.paymentReqBody(),
paymentRequestValidationMiddleware.validate,
eventBookingExecutor.eventBooking);

router.get('/success',eventBookingExecutor.successEventBooking);
router.get('/cancel',eventBookingExecutor.failedEventBooking);

router.post("/booking",
bookingValidationMiddleware.myBookingReqBody(),
bookingValidationMiddleware.validate,
myBooking)

router.post('/mybooking',getAllBookings)

module.exports = router;
