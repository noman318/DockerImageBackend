const mongoose = require("mongoose");
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
    description: {
      type: String,
      // required:true
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
      // required:true
    },
    seats: [
      {
        row: { type: String },
        seat_number: { type: Number },
        status: { type: Number, default: 0 },
        section: { type: String },
        price: { type: Number },
        show_id: { type: String },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("event", eventSchema);
