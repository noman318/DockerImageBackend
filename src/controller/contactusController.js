const { contactHandle } = require("../services/contactusService");
/**
 * @description Saves contact details of the user
 * @param req Email ID and Message 
 * @param res if error then plz provide the data or with the status code 200
 */
async function postContactUs(req, res) {
    console.log(req.body);
    let data = await contactHandle.PostData(req.body);
    if (!data) {
        res.status(404).json({ err: 1, message: "Please Provide Data" });
    } else {
        res.status(200).json(data);
    }
}
/**
 * @description gets all the data 
 * @param  req all data of the message posted by the user 
 * @param  res if error then provide whith error message or provides with 200 status code 
 */
async function getContactUs(req, res) {
    let data = await contactHandle.getAlldata();
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
    getContactUs,
};
module.exports = { contactController };
