const { userService } = require("../services/userService");
const { authService } = require("../services/authService");
const {userProfileService} = require("../services/myProfileService")

async function getProfileById(req, res) {
    //   res.send(req.params.id)
    let data = await userProfileService.getByid(req.params.id);
    if (!data) {
      res.status(404).json({ err: 1, message: "Id is Wrong" });
    } else {
      res.status(200).json(data);
    }
  }

  async function updateProfileById(req, res) {
    let databody = req.body;
    let data = await userProfileService.updateByid(req.params.id, databody);
    if (!data) {
      res.status(404).json({ err: 1, message: "data is not update" });
    } else {
      res.status(200).json(data);
    }
  }
profileController= {getProfileById,updateProfileById};
module.exports = { profileController };
