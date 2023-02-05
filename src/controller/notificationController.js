const sendNotificationToClient  = require("../utils/pushNotify");

const addNotification=async(req,res)=>{
    const { name, message } = req.body;
    const columns = 'name, message';
    const values = `'${name}', '${message}'`;
    try {
    //   const data = await messagesModel.insertWithReturn(columns, values);
      const tokens = ["c9oVnid56XTE8_TGdwsiDu:APA91bFXO8ZWVqihzsK7ctaJEKrRgEidSHgN52hFEtSZ8p4TFXdmXkIC78Pss9kwK_cvUiArWRoAXpS-6FXpR-8cPspMvo57XRXwb0emtdjzJy9ta204NbBkllZuJyFx68YKHCzubjMV"];
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