const ContactUs = require("../model/ContactUs");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");
const { sendMailer } = require("../utils/mail");
/**
 * @description Function to store contact form data in the database
 */
const contactHandle = {
    PostData: async function (data) {
        try {
            const result = await ContactUs.create({
                ...data,
            });
            // Send confirmation email to the user
            sendMailer(
                data.email,
                null,
                "We will get back to you soon",
                "contactus",
                null,
                null
            );
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    /**
     * @description Function to retrieve all contact form data from the database
     */
    getAlldata: async function () {
        try {
            let contactDetail = await ContactUs.find();
            return contactDetail;
        } catch (error) {
            console.log(error);
        }
    },
};
module.exports = { contactHandle };
