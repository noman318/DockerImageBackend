const Auth = require("../model/Auth");
const { encpassword } = require("../utils/passwordencrypt");
const authHandler = {
  authCreate: async function (userdata, password) {
    await Auth.create({
      userid: userdata._id,
      email: userdata.email,
      password: await encpassword(passwordss),
    });
    return true;
  },
};

module.exports = { authHandler };
