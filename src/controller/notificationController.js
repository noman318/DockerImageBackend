const sendNotificationToClient  = require("../utils/pushNotify");

const addNotification=async(req,res)=>{
    const { name, message } = req.body;
    // const columns = 'name, message';
    // const values = `'${name}', '${message}'`;
    try {
    //   const data = await messagesModel.insertWithReturn(columns, values);
      const tokens = ["e4rZoBSNFm_78coss5clkn:APA91bEMjPFo9ARnWK4Ni0jn6GCD5zA8lMu65NVif0D9WaK4YoWZDSGPoCDU8FzwD5waVLbSeQo4Pzyavr2X6Ju7wLFYcFUxmWIFxR1sOoK96Yq8fa02ZWeo8hFMJb1EIEnHgQGrHHVh"];
      const notificationData = {
        title: 'Hello From Nodejs',
        body: message,
      };
      console.log('notificationData :>> ', notificationData);
      sendNotificationToClient(tokens, notificationData);
    //   res.status(200).json({ messages: data.rows });
      res.status(200).json({ messages: "hello" });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
}

module.exports=addNotification