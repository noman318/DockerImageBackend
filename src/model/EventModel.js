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
    artist: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      //   required:true
    },
    endDate: {
      type: Date,
      //   required:true
    },
    map: {
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
        row: { type: String, required: true },
        seat_number: { type: Number, required: true, unique: true },
        status: { type: Number, required: true,default:0 },
        section: { type: String, required: true },
        price: { type: Number, required: true },
        show_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("event", eventSchema);
