const { userService } = require("../services/userService");
<<<<<<< HEAD

const getAllUserData = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    const data = await userService.deactivateUser(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};
const updateRole = async (req, res) => {
  try {
    const data = await userService.updateRole(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

const getUserByName = async (req, res) => {
  try {
    const data = await userService.getUserByName(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

const userController = {
  getAllUserData,
  deactivateUser,
  getUserByName,
  updateRole,
=======
/**
 *
 * @getAllUserData request the data of all the user
 * @returns the json object of the user details
 */
const getAllUserData = async (req, res) => {
    try {
        const data = await userService.getAllUser();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
    }
};
/**
 *
 * @deactivateUser deactivate user based on their id provided in the request
 * @param req id of the user and details of the user 
 */
const deactivateUser = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await userService.deactivateUser(id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
    }
};
/**
 *
 * @getUserByName retrieves a user based on their name provided in the request body by calling userService function getUserByName.
 * @param req user detail body 
 */
const getUserByName = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await userService.getUserByName(name);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
    }
};

const userController = {
    getAllUserData,
    deactivateUser,
    getUserByName,
>>>>>>> bf9daf39fcea97b395771350b89f476a5a7d2d28
};

module.exports = userController;
