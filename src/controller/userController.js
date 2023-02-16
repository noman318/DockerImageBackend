const { userService } = require("../services/userService");

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
};

module.exports = userController;
