const express = require("express");
const {
  eventBookingExecutor,
} = require("../controller/eventBookingController");

const router = express.Router();

router.post("/pay", eventBookingExecutor.eventBooking);
router.get("/success", eventBookingExecutor.successEventBooking);
router.get("/cancel", eventBookingExecutor.failedEventBooking);

module.exports = router;
