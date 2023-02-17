const Auth = require("../model/Auth");
const { passWord } = require("../utils/passwords");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");
const { authToken } = require("../middleware/authMiddleware");
const { sendMailer } = require("../utils/mail");
const crypto = require("crypto");
const { addPushNotify } = require("../utils/addPushNotification");
/**
 *@description Function to create a new authentication user
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
   * @param  email {string} email - The email address of the user to find.
   * @returns - A promise that resolves to the user object if found, false otherwise.
   */
  authFindOne: async function (email) {
    let user = await Auth.findOne({ email });
    if (user) return user;
    return false;
  },
  /**
   * @description  Function to populate an authentication user by email
   * @param email The email address of the user to find.
   */
  authDataWithUserData: async function (email) {
    const user = await Auth.findOne({ email }).populate("userId");
    if (user) return user;
    return false;
  },
  /**
   * @description Function to find an authentication user by email and update the token
   * @param  email fint the user by email
   * @param  token idf the user found then update the tocken
   */
  authFindOneUpdate: async function (email, token) {
    const user = await Auth.findOneAndUpdate(
      { email },
      { $set: { token } },
      { new: true }
    );
    if (user) return user;
    return false;
  },
  /**
   * @description  Function to find an authentication user by ID
   * @param {*} id  authentication user by ID
   */
  authFindById: async function (id) {
    const user = await Auth.findById(id);
    if (user) return user;
    return false;
  },
  /**
   * @description Function to update the password of an authentication user
   * @param id get the user id
   * @param hash password
   */

  authUpdateOne: async function (id, hash) {
    const user = await Auth.updateOne(
      { _id: id },
      { $set: { password: hash } },
      { new: true }
    );
    if (user) return user;
    return false;
  },
  /**
   * @description Function to sign in a user and generate a token
   * @param userData get user details to feth the user email
   */

  signIn: async function (userData) {
    const userInfo = await this.authDataWithUserData(userData.email);

    if (userInfo) {
      if (userInfo.userId.isActive == 1) {
        const validPassword = await passWord.decruptPassword(
          userData.password,
          userInfo.password
        );
        if (!validPassword) {
          const msg = "Invalid Credentials!";
          return errorMsg(msg, 401);
        } else {
          try {
            const token = await authToken.jwtToken(userInfo);
            await this.authFindOneUpdate(userData.email, token);

            const data = {
              _id: userInfo._id,
              email: userInfo.email,
              isAuthenticated: true,
              isAdmin: userInfo.role === "admin",
              token: token,
            };

            return successMsg("Login successful", data);
          } catch (err) {
            return errorMsg(err.message);
          }
        }
      } else {
        const msg = "Access denied";
        return errorMsg(msg, 401);
      }
    } else {
      const msg = "This email has not been registered!";
      return errorMsg(msg, 204);
    }
  },
  /**
   * @description is used for reset the password if the user has forget the password
   * @param userData grts the user details and fetch the email from the detail
   */

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
  /**
   *
   * @description this function is used for change the exesting password of the user
   */
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
