const { authToken } = require("../middleware/authMiddleware");
const { userService } = require("../services/userService");
const UserModel = require("../model/User");
const Auth = require("../model/Auth");
const User = require("../model/User");
/**
 * log the user id
 * if no user data found
 * return user data
 * if there is any error while finding user data
 */
const userProfileService = {
  getById: async function (id) {
    console.log(id);
    try {
      let data = await Auth.findById(id).populate("userId");
      console.log(data);
      if (!data) {
        return { err: 1, msg: `User with id ${id} not found` };
      }
      return data;
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  /**
   * Update a user's profile by ID.
   * @param {string} id - The ID of the user to update.
   * @param {Object} requestbody - The updated user information.
   * @returns {Object} - An object containing information about the updated profile.
   */
  updateById: async function (id, requestbody) {
    try {
      const dataUser = await Auth.findByIdAndUpdate(id, requestbody);
      const eventUser = await User.findByIdAndUpdate(
        dataUser.userId,
        requestbody
      );
      if (!dataUser && !eventUser) {
        return { err: 1, msg: `User with id ${id} not found` };
      }
      return { err: 0, msg: "Profile Updated" };
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
};

module.exports = { userProfileService };
