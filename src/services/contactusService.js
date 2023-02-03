const ContactUs = require("../model/ContactUs");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");
const contacttHandle = {
    PostData: async function (data) {
        try {
            return ContactUs
                .create({
                    ...data,
                })
                .then((res) => res)
                .catch((err) => err);
        } catch (error) {
            console.log(error);
        }
    },
    getAlldata: async function () {
        try {
            let ContactU = await ContactUs.find();
            return ContactU;
        } catch (error) {
            console.log(error);
        }
    },
}
module.exports = { contacttHandle };
