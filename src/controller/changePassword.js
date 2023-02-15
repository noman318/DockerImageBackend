const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
/**
 *
 * @changePassword for the user object , gets user id and search the user by the id using Auth.findById , then it bcrypt the old password and compared with the database if valid the sets the new password for the user
 * @req oldpass, newpass, id
 */
async function changePassword(req, res) {
  let { oldpass, newpass, id } = req.body;
  // finding user by id
  let data = await Auth.findById({ _id: id });
  const isValid = bcrypt.compare(oldpass, data.password);
  if (isValid) {
    // making password encrupt
    const hash = bcrypt.hashSync(newpass, process.env.saltRounds);
    // update password
    Auth.updateOne(
      { _id: id },
      { $set: { password: hash } },
      { new: true },
      (err) => {
        if (err) throw res.json(err);
      }
    );
    res.json("changed successful");
  }
  res.json("error");
}

module.exports = { changePassword };
