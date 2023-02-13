const sendNotificationToClient  = require("../utils/pushNotify");

const addNotification=async(req,res)=>{
    const { title, message, token } = req.body;
    
    try {
    //   const data = await messagesModel.insertWithReturn(columns, values);
      const tokens = [`${token}`];
      const notificationData = {
        title: title,
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