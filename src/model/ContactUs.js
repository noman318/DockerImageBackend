const mongoose = require("mongoose");
const contactUs = new mongoose.Schema({
    email: {
        type: String,
    },
    text: {
        type: String,
    },
})
module.exports = mongoose.model("contactus", contactUs);