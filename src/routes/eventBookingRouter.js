const express=require('express');
const { myBooking } = require('../controller/BookingController');
const { eventBookingExecutor } = require('../controller/eventBookingController');
const { bookingValidationMiddleware } = require('../middleware/bookingMiddleware');

const router = express.Router();

router.post('/pay',eventBookingExecutor.eventBooking);
router.get('/success',eventBookingExecutor.successEventBooking);
router.get('/cancel',eventBookingExecutor.failedEventBooking);
router.post("/booking",
bookingValidationMiddleware.myBookingReqBody(),
bookingValidationMiddleware.validate,
myBooking)

module.exports = router;
