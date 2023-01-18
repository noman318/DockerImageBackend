const { userService } = require("../services/userservice");
const { authService } = require("../services/authservice");

async function signIn(req, res) {
  const userdata = await authService.signin(req.body, res);
  if (userdata) {
    res.json(userdata);
  } else {
    res.json("error");
  }
}

async function signUp(req, res) {
  const userdata = await userService.signup(req.body);
  if (userdata) {
    res.json(userdata);
  } else {
    res.json("something went wrong");
  }
}

async function resetpassword(req, res) {
  let userdata = await authService.resetpassword(req.body, res);
  if (userdata) {
    res.json(userdata);
  } else {
    res.json("error");
  }
}

async function changepassword(req, res) {
  const userdata = await authService.changepassword(req.body);
  if (userdata) {
    res.json(userdata);
  } else {
    res.json("error");
  }
}
module.exports = { signUp, signIn, resetpassword, changepassword };
