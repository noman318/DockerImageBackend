const { userService } = require("../services/userService");
/**
 *
 * @getAllUserData request the data of all the user
 * @returns the json object of the user details
 */
const getAllUserData = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    if (data.length == 0) {
      return res.status(204).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ messages: e });
  }
};

/**
 *
 * @deactivateUser deactivate user based on their id provided in the request
 * @param req id of the user and details of the user
 */

const deactivateUser = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    const data = await userService.deactivateUser(req.body);
    if (data.length == 0) {
      return res.status(204).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ messages: e });
  }
};

const updateRole = async (req, res) => {
  try {
    const data = await userService.updateRole(req.body);
    if (data.length == 0) {
      return res.status(204).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ messages: e });
  }
};

/**
 *
 * @getUserByName retrieves a user based on their name provided in the request body by calling userService function getUserByName.
 * @param req user detail body
 */

const getUserByName = async (req, res) => {
  try {
    const data = await userService.getUserByName(req.body);
    if (data.length == 0) {
      return res.status(204).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ messages: e });
  }
};

const userController = {
  getAllUserData,
  deactivateUser,
  getUserByName,
  updateRole,
};

module.exports = userController;
