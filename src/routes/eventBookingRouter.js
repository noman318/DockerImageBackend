const express=require('express');
const { myBooking } = require('../controller/BookingController');
const { eventBookingExecutor } = require('../controller/eventBookingController');

const router = express.Router();

router.post('/pay',eventBookingExecutor.eventBooking);
router.get('/success',eventBookingExecutor.successEventBooking);
router.get('/cancel',eventBookingExecutor.failedEventBooking);
router.post("/booking",myBooking)

module.exports = router;
