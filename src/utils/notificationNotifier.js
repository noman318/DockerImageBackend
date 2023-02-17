const axios = require("axios");
/**
 *@param title: a string that represents the title of the notification
 *@param message: a string that represents the content of the notification
 * @param token: a string that represents the user's device token to which the notification should be sent.
 */
const notifier = async (title, message, token) => {
  try {
    if (token) {
      console.log("--token--", token);
      await axios
        .post("http://localhost:7899/event/notification", {
          title: title,
          message: message,
          token: token,
        })
        .then((res) => {
          console.log("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = notifier;
