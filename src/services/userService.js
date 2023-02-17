const User = require("../model/User");
const { authService } = require("./authService");
const { errorMsg } = require("../utils/error");
const { successMsg } = require("../utils/success");
/**
 *@description in signup the details of the user are been saved
 * getAllUser it gives all the details of the user
 * the admin can deactivate the user
 * getUserBName the user can be searched by its name
 */
const userService = {
  findUser: async function (email) {
    const userData = User.findOne({ email });
    if (userData) {
      return userData;
    }
    return false;
  },
  /**
   * @description Create a new user.
   * @param  data - The data for the new user to be created.
   * @returns - The newly created user data or false if creation fails.
   */
  userCreate: async function (data) {
    const userData = await User.create(data);
    if (userData) return userData;
    return false;
  },
  /**
   * @description find a user by email and delete
   *
   * @param email get email from the user details
   * @returns
   */
  userfindOneAndDelete: async function (email) {
    const userData = await User.findOneAndDelete(email);
    if (userData) return userData;
    return false;
  },
  /**
   * @description register a new user
   * @param data object of the users and compare the entered email with existing emails
   * @returns if email exist then throw error message
   */
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
  /**
   * @description fetch all the user details
   */
  getAllUser: async function (query) {
    try {
      const userData = await User.find({}).sort({ isActive: 1 });
      if (userData) {
        return { err: 0, length: userData.length, data: userData };
      }
      return { err: 1, message: "Something Went wrong" };
    } catch (error) {
      return { err: 1, message: "Something Went wrong" };
    }
  },

  /**
   * @description get user detail by user id
   * @param id find user by id
   */

  getUserById: async function (id) {
    try {
      const userData = await User.findById(id);

      if (userData) {
        return { err: 0, data: userData };
      }
      return { err: 1, message: "Something Went wrong" };
    } catch (e) {
      return { err: 1, message: "Something Went wrong" };
    }
  },

  updateRole: async function (data) {
    try {
      const userData = await this.getUserById(data.id);
      if (userData) {
        await User.updateOne(
          { _id: data.id },
          { $set: { role: data.role, isActive: data.isActive } },
          { new: true }
        );
        return { err: 0, message: "Updated" };
      }
      return { err: 1, message: "id does not exist" };
    } catch (error) {
      return { err: 1, message: "Something Went wrong" };
    }
  },

  /**
   * @description the admin can activate
   * @param id get user by id
   */

  deactivateUser: async function (data) {
    try {
      const userData = await User.findById(data.id).updateOne({
        $set: { isActive: data.isActive },
      });
      return { err: 0, data: userData };
    } catch (error) {
      return { err: 1, message: "Something Went wrong" };
    }
  },

  getUserByName: async function (data) {
    const perPage = 10;

    try {
      const userData = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: data.name,
            options: "i",
          },
        },
      });

      var pageNumber = data.page == 0 ? 1 : data.page;
      var startFrom = (pageNumber - 1) * perPage;
      let dataEvent = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: data.name,
            options: "i",
          },
        },
      })
        .skip(Number(startFrom))
        .limit(Number(perPage));

      if (userData) {
        return { err: 0, pages: userData.length, data: dataEvent };
      }
      return { err: 1, message: "Something Went wrong" };
    } catch (e) {
      return { err: 1, message: "Something Went wrong" };
    }
  },
};

module.exports = { userService };
