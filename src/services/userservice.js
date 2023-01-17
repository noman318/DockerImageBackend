const User = require("../model/User");
const { authHandler } = require("./authservice");

const userhandler = {
  finduser: async function (email) {
    let userdata = await User.findOne({ email: email });
    if (userdata) return userdata;
    else
      return { msg: "Try any other email, this email is already registered!" };
  },
  usercreate: async function (data) {
    const userdata = await User.create(data);
    if (userdata) return userdata;
    else return false;
  },

  signup: async function (data) {
    const userdata = await this.finduser(data.email);
    if (userdata) {
      return res.json({
        err: "1",
        msg: "Try any other email, this email is already registered!",
      });
    }
    try {
      const userdata = await this.usercreate(data);
      await authHandler.authCreate(userdata, data.password);
      return res.json({ err: 0, msg: "User Registered" });
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};

module.exports = { userhandler };
