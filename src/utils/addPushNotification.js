const sendNotificationToClient = require("./pushNotify");
/**
 * @description Sends a push notification to a client using the provided title, message, and token.
 * @param  title The title of the push notification.
 * @param  message The body of the push notification.
 * @param  token The unique token identifying the client to receive the push notification.
 */
const addPushNotify = async (title, message, token) => {
  try {
    const tokens = [`${token}`];
    console.log("---", tokens)
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
module.exports = { addPushNotify }