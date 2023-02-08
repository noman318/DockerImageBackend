const ContactUs = require("../model/ContactUs");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");
const { sendMailer } = require("../utils/mail");
const contactHandle = {
    PostData: async function (data) {
        try {
            const result = await ContactUs
                .create({
                    ...data,
                })
            sendMailer(
                data.email, null, "We will get back to you soon", "contactus", null, null
            )
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    getAlldata: async function () {
        try {
            let contactDetail = await ContactUs.find();
            return contactDetail;
        } catch (error) {
            console.log(error);
        }
    },
}
module.exports = { contactHandle };
