const mongoose = require("mongoose");
/**
 * Define contact us schema
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
