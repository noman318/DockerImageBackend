const mongoose = require("mongoose");
/**
 *  @description Define the schema for events
 */
const eventSchema = new mongoose.Schema(
  {
    threaterId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // "futureDate" field is defined twice in the schema. Removing the duplicate.
    futureDate: {
      type: String,
    },
    description: {
      type: String,
    },
    future: {
      type: Boolean,
      default: false,
    },
    futureDate: {
      type: String,
    },
    artist: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    seatAvailable: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    seats: [
      {
        seat_number: { type: Number },
        status: { type: Number, default: 0 },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("event", eventSchema);
