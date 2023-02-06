const sendNotificationToClient = require("./pushNotify");

const addPushNotify=async(title,message,token)=>{
try {
    const tokens = [`${token}`];
    console.log("---",tokens)
    const notificationData = {
      title: title,
      body: message,
    };
    console.log('notificationData :>> ', notificationData);
    
    sendNotificationToClient(tokens, notificationData);
    
} catch (error) {
    console.log(error)
}
}
module.exports={addPushNotify}