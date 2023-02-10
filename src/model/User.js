const mongoose = require("mongoose");
const { ADMIN, USER } = require("../../constants");
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
    default:""
    // required: true,
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
  role: {
    type: String,
    enum: [ADMIN, USER],
    default: USER,
  },
});
module.exports = mongoose.model("user", userSchema);
