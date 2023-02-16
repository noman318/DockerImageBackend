const mongoose = require("mongoose");
/**
 * @description Define the schema for the authentication collection
 */
const authSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("auth", authSchema);
