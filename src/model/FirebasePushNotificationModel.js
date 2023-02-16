const mongoose = require("mongoose");
/**
 * @description Define schema
 */
const FPNMODEL = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    firebaseDeviceToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("fpntoken", FPNMODEL);
