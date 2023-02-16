const mongoose = require("mongoose");
/**
 * @description Define the booking schema
 */
const BookingSchema = new mongoose.Schema({
    // The user who made the booking
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    // The event that was booked
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
    },
    // Details of the seats that were booked
    seatDetails: [],
    // The payment ID associated with the booking
    paymentId: {
        type: String,
    },
    // The amount that was paid
    amount: {
        type: String,
    },
    // The state of the transaction
    transactionState: {
        type: String,
    },
    // The name of the person who made the payment
    payerName: {
        type: String,
    },
    // The email address of the person who made the payment
    payerEmail: {
        type: String,
    },
});

module.exports = mongoose.model("booking", BookingSchema);
