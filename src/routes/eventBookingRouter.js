const express = require("express");
// Import the controller functions and middleware functions
const {
  myBooking,
  getAllBookings,
} = require("../controller/bookingController");
const {
  eventBookingExecutor,
} = require("../controller/eventBookingController");
const {
  bookingValidationMiddleware,
} = require("../middleware/bookingMiddleware");
const {
  paymentRequestValidationMiddleware,
} = require("../middleware/paymentValidationMiddleware");
const router = express.Router();
// Define a POST route for initiating a payment request for an event booking
router.post(
  "/pay",
  paymentRequestValidationMiddleware.paymentReqBody(),
  paymentRequestValidationMiddleware.validate,
  eventBookingExecutor.eventBooking
);

// Define GET routes for handling payment success and cancellation

router.get("/success", eventBookingExecutor.successEventBooking);
router.get("/cancel", eventBookingExecutor.failedEventBooking);
// Define a POST route for creating a booking
router.post(
  "/booking",
  bookingValidationMiddleware.myBookingReqBody(),
  bookingValidationMiddleware.validate,
  myBooking
);
// Define a POST route for retrieving all bookings made by a user
router.post("/mybooking", getAllBookings);

module.exports = router;
