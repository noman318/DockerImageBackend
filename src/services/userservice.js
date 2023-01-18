const User = require("../model/User");
const { authService } = require("./authservice");
const { errormsg } = require("../utils/error");
const { successmsg } = require("../utils/success");

const userService = {
  finduser: async function (email) {
    const userdata = User.findOne({ email });
    if (userdata) {
      return userdata;
    }
    return false;
  },

  usercreate: async function (data) {
    const userdata = await User.create(data);
    if (userdata) return userdata;
    return false;
  },

  signup: async function (data) {
    const userdata = await this.finduser(data.email);
    if (userdata) {
      const msg = "Try any other email, this email is already registered!";
      return errormsg(msg);
    }
    try {
      const userdata1 = await this.usercreate(data);
      const authData = await authService.authCreate(userdata1, data.password);
      if (authData) {
        const msg = "User Registered";
        return successmsg(msg);
      }
    } catch (err) {
      return errormsg(err.message);
    }
  },
};

module.exports = { userService };
