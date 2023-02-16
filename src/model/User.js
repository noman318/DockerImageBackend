const mongoose = require("mongoose");
const { ADMIN, USER } = require("../../constants");
/**
 *@description Define the user schema
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  mobileNumber: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  isActive: {
    type: Number,
    default: 1,
  },
  role: {
    type: String,
    enum: [ADMIN, USER],
    default: USER,
  },
});
module.exports = mongoose.model("user", userSchema);
