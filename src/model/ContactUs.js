const mongoose = require("mongoose");
/**
 * @description Define contact us schema
 */
const contactUs = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("contactus", contactUs);
