const sendNotificationToClient = require("../utils/pushNotify");
/**
 *
 * @addNotification The purpose of this function is to handle an HTTP request to send a push notification to a client identified by a token.
 * @param req title , message , tocken 
 */
const addNotification = async (req, res) => {
  const { title, message, token } = req.body;

  try {
    const tokens = [`${token}`];
    const notificationData = {
      title: title,
      body: message,
    };
    console.log("notificationData :>> ", notificationData);
    sendNotificationToClient(tokens, notificationData);
    res.status(200).json({ messages: "hello" });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

module.exports = addNotification;
