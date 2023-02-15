const { contactHandle } = require("../services/contactusService");
/**
 *
 * @postContactUs receives a request object and logs its body to the console. It then awaits the result of calling the PostData method from the contactHandle object with the request body
 * @req contactHandle.PostData
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
 * @getContactUs request all date of the submited review 
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
