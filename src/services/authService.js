const Auth = require("../model/Auth");
const { passWord } = require("../utils/passwords");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");
const { authToken } = require("../middleware/authMiddleware");
const { sendMailer } = require("../utils/mail");
const crypto = require("crypto");
const { addPushNotify } = require("../utils/addPushNotification");
/**
 * Function to create a new authentication user
 */
const authService = {
  authCreate: async function (userData, upassword) {
    const pass = passWord.encruptPassword(upassword);
    const authUser = await Auth.create({
      userId: userData._id,
      email: userData.email,
      password: pass,
    });
    return authUser;
  },
  /**
   *
   * @param {*} email {string} email - The email address of the user to find.
   * @returns {Promise<object|false>} - A promise that resolves to the user object if found, false otherwise.
   */
  authFindOne: async function (email) {
    let user = Auth.findOne({ email });
    if (user) return user;
    return false;
  },
  // Function to populate an authentication user by email
  authPopulate: async function (email) {
    const user = Auth.findOne({ email }).populate("userId");
    if (user) return user;
    return false;
  },
  // Function to find an authentication user by email and update the token
  authFindOneUpdate: async function (email, token) {
    const user = Auth.findOneAndUpdate(
      { email },
      { $set: { token } },
      { new: true }
    );
    if (user) return user;
    return false;
  },
  // Function to find an authentication user by ID
  authFindById: async function (id) {
    const user = Auth.findById(id);
    if (user) return user;
    return false;
  },
  // Function to update the password of an authentication user

  authUpdateOne: async function (id, hash) {
    const user = Auth.updateOne(
      { _id: id },
      { $set: { password: hash } },
      { new: true }
    );
    if (user) return user;
    return false;
  },
  // Function to sign in a user and generate a token

  signIn: async function (userData) {
    const user = await this.authFindOne(userData.email);
    if (user) {
      const validPassword = await passWord.decruptPassword(
        userData.password,
        user.password
      );
      if (!validPassword) {
        const msg = "Invalid Credentials!";
        return errorMsg(msg, 401);
      } else {
        try {
          const user = await this.authPopulate(userData.email);
          const token = await authToken.jwtToken(user);
          await this.authFindOneUpdate(userData.email, token);
          console.log(user);

          const data = {
            _id: user._id,
            email: user.email,
            isAuthenticated: true,
            isAdmin: user.role === "admin",
            token: token,
          };
          return successMsg("successful", data);
        } catch (err) {
          return errorMsg(err.message);
        }
      }
    } else {
      const msg = "This email has not been registered!";
      return errorMsg(msg, 204);
    }
  },

  resetPassword: async function (userData) {
    const user = await this.authFindOne(userData.email);
    if (user) {
      try {
        let resetToken = crypto.randomBytes(32).toString("hex");
        const m1 = await sendMailer(
          userData.email,
          resetToken,
          "Reset Password Link",
          "resetMail",
          user._id
        );
        if (m1) {
          const msg = "mail sent";
          return successMsg(msg);
        }
      } catch (err) {
        return errorMsg(err.message);
      }
    } else {
      const msg = "This email has not been registered!";
      return errorMsg(msg, 204);
    }
  },

  changePassword: async function (userData) {
    try {
      const user = await this.authFindById(userData.id);
      console.log(userData.token);
      console.log(userData.id);
      if (user) {
        const validPassword = await passWord.decruptPassword(
          userData.oldPassword,
          user.password
        );
        if (!validPassword && !token) {
          const msg = "Invalid Credentials!";
          return errorMsg(msg, 203);
        } else {
          const hashPass = passWord.encruptPassword(userData.newPassword);
          await this.authUpdateOne(userData.id, hashPass);
          const msg = "changed successful";
          return successMsg(msg);
        }
      } else {
        const msg = "id does not exist";
        return errorMsg(msg, 204);
      }
    } catch (err) {
      return errorMsg(err.message);
    }
  },
};
module.exports = { authService };
