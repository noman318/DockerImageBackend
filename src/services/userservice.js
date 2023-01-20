const User = require("../model/User");
const { authService } = require("./authService");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");

const userService = {
  findUser: async function (email) {
    const userData = User.findOne({ email });
    if (userData) {
      return userData;
    }
    return false;
  },

  userCreate: async function (data) {
    const userData = await User.create(data);
    if (userData) return userData;
    return false;
  },

  userfindOneAndDelete: async function (email) {
    const userData = User.findOneAndDelete(email);
    if (userData) return userData;
    return false;
  },

  signUp: async function (data) {
    const userData = await authService.authFindOne(data.email);
    if (userData) {
      const msg = "Try any other email, this email is already registered!";
      return errorMsg(msg, 409);
    }
    try {
      const userData1 = await this.userCreate(data);
      const authData = await authService.authCreate(userData1, data.password);
      if (authData) {
        const msg = "User Registered";
        return successMsg(msg);
      } else {
        await this.userDelete(data.email);
        return errorMsg("Data is not saved in Db", 204);
      }
    } catch (err) {
      return errorMsg(err.message);
    }
  },
};

module.exports = { userService };
