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
    future:{
     type:Boolean,
     default:false,
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
        seat_number: { type: Number, required: true},
        status: { type: Number, required: true,default:0 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("event", eventSchema);
