// import { sendNotificationToClient } from '../utils/nofity';
// const messagesModel={

const  {sendNotificationToClient}  = require("../utils/nofity");
const addMessage = async (req, res) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    // const data = await messagesModel.insertWithReturn(columns, values);
    const tokens ="AAAA6IDeHc0:APA91bHR0zru_yo5D4lzXIPRDD_m-6SsclP_qmZN6aS2S53YrE-gAirObXK8E-uwPhjqtwT49lhTvuokRo6QTwTbzZ4VHqWo0q4c4ij8p7cCJcrtmfcnLHZqOv4zRYGQtvZWaRCPrtCb";
    const notificationData = {
        data:{
          Mykey:"hello"
        }
    };
    console.log(notificationData)
    const data=sendNotificationToClient(tokens, notificationData);
    console.log(data)
    res.status(200).json({err:0, messages: "Hello india" });
  } catch (err) {
    res.status(200).json({ messages: "error" });
  }
};
module.exports=addMessage