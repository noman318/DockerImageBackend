const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("user", userSchema);
