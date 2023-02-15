const { userService } = require("../services/userService");
const { authService } = require("../services/authService");
const { userProfileService } = require("../services/myProfileService");
/**
 *
 * @getProfileById function handles an HTTP GET request to retrieve a user's profile by their ID. It calls the getById function from the userProfileService module, passing in the ID from the request parameters.
 */
async function getProfileById(req, res) {
  //   res.send(req.params.id)
  let data = await userProfileService.getById(req.params.id);
  if (!data) {
    res.status(404).json({ err: 1, message: "Id is Wrong" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 * @updateProfileById function handles an HTTP GET request to retrieve a user's profile by their ID. It calls the getById function from the userProfileService module, passing in the ID from the request parameters.
 */
async function updateProfileById(req, res) {
  let dataBody = req.body;
  let data = await userProfileService.updateById(req.params.id, dataBody);
  if (!data) {
    res.status(404).json({ err: 1, message: "Cannot Update Data" });
  } else {
    res.status(200).json(data);
  }
}
profileController = { getProfileById, updateProfileById };
module.exports = { profileController };
