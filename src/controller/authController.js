const User = require("../model/User");
const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signIn(req, res) {
  const { email, password } = req.body;

  let user = await Auth.findOne({ email });

  if (!user) {
    return res.json({ err: 1, msg: "This email has not been registered!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ err: 1, msg: "Invalid Credentials!" });
  }
  const userdata = await Auth.findOne({ email: email }).populate("userid");
  const token = jwt.sign(
    {
      _id: userdata.userid._id,
      name: `${userdata.userid.firstname} ${userdata.userid.lastname}`,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30days" }
  );
  await Auth.findOneAndUpdate(
    { email: email },
    { $set: { token: token } },
    { new: true }
  );
  res.send({
    email: user.email,
    isAuthenticated: true,
    token: token,
    err: 0,
  });
}

async function signUp(req, res) {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.json({
      err: "1",
      msg: "Try any other email, this email is already registered!",
    });
  }
  try {
    const userdata = await User.create(req.body);
    await Auth.create({
      userid: userdata._id,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, process.env.saltRounds),
    });

    res.json({ err: 0, msg: "User Registered" });
  } catch (err) {
    res.status(400).json(err.message);
  }
}
module.exports = { signUp, signIn };
