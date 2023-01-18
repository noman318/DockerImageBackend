const Auth = require("../model/Auth");
const { passWord } = require("../utils/passwords");
const { errormsg } = require("../utils/error");
const { successmsg } = require("../utils/success");
const { authToken } = require("../middleware/authMiddleware");
const { sendMailer } = require("../utils/mail");

const authService = {
  authCreate: async function (userdata, upassword) {
    const pass = passWord.encpass(upassword);
    const authUser = await Auth.create({
      userid: userdata._id,
      email: userdata.email,
      password: pass,
    });
    return authUser;
  },

  authfindone: async function (email) {
    let user = Auth.findOne({ email });
    if (user) return user;
    return false;
  },

  authpopulate: async function (email) {
    const user = Auth.findOne({ email }).populate("userid");
    if (user) return user;
    return false;
  },

  authfindoneupdate: async function (email, token) {
    const user = Auth.findOneAndUpdate(
      { email },
      { $set: { token } },
      { new: true }
    );
    if (user) return user;
    return false;
  },

  authfindbyid: async function (id) {
    const user = Auth.findById(id);
    if (user) return user;
    return false;
  },

  authupdateone: async function (id, hash) {
    const user = Auth.updateOne(
      { _id: id },
      { $set: { password: hash } },
      { new: true }
    );
    if (user) return user;
    return false;
  },

  signin: async function (userdata) {
    const user = await this.authfindone(userdata.email);
    if (user) {
      const validPassword = await passWord.decruptpass(
        userdata.password,
        user.password
      );
      if (!validPassword) {
        const msg = "Invalid Credentials!";
        return errormsg(msg);
      } else {
        try {
          const user = await this.authpopulate(userdata.email);
          const token = await authToken.jwtToken(user);
          await this.authfindoneupdate(userdata.email, token);
          const data = {
            email: user.email,
            isAuthenticated: true,
            token: token,
          };
          const msg = "successful";
          return successmsg(msg, data);
        } catch (err) {
          return errormsg(err.message);
        }
      }
    } else {
      const msg = "This email has not been registered!";
      return errormsg(msg);
    }
  },

  resetpassword: async function (userdata) {
    const user = await this.authfindone(userdata.email);
    if (user) {
      try {
        const m1 = await sendMailer(userdata.email);

        if (m1) {
          const msg = "mail sent";
          return successmsg(msg);
        }
      } catch (err) {
        return errormsg(err.message);
      }
    } else {
      const msg = "This email has not been registered!";
      return errormsg(msg);
    }
  },

  changepassword: async function (userdata) {
    try {
      const user = await this.authfindbyid(userdata.id);
      if (user) {
        const validPassword = await passWord.decruptpass(
          userdata.oldpass,
          user.password
        );
        if (!validPassword) {
          const msg = "Invalid Credentials!";
          return errormsg(msg);
        } else {
          const hashpass = passWord.encpass(userdata.newpass);
          await this.authupdateone(userdata.id, hashpass);
          const msg = "changed successful";
          return successmsg(msg);
        }
      } else {
        const msg = "id does not exist";
        return errormsg(msg);
      }
    } catch (err) {
      return errormsg(err.message);
    }
  },
};
module.exports = { authService };
