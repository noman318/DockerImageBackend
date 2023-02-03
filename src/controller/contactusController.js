const { contacttHandle } = require("../services/contactusService");
const { sendMailer } = require("../utils/mail");

async function postContactUs(req, res) {
    console.log(req.body)
    let data = await contacttHandle.PostData(req.body);
    if (!data) {
        res.status(404).json({ err: 1, message: "Please Provide Data" });
    } else {
        sendMailer(
            req.body.email,null,"We will get back to you soon","contactus",null,null
        )
        res.status(200).json(data);
    }
}
async function getContactUs(req, res) {
    let data = await contacttHandle.getAlldata();
    if (!data) {
        res
            .status(404)
            .json({ err: 1, message: "Something is wrong with getting data" });
    } else {

        res.status(200).json(data);
    }
}
const contactController = {
    postContactUs,
    getContactUs
};
module.exports = { contactController }