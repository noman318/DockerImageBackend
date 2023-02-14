const jwt = require("jsonwebtoken");
const authToken = {
  jwtValidate: function () {
    return (req, res, next) => {
      if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
          if (err) {
            res.send("wrong token");
          } else {
            next();
          }
        });
      } else {
        res.status(400).json({
          error: 1,
          msg: "Pls Provide token",
        });
      }
    };
  },

  jwtToken: function (user) {
    return jwt.sign(
      {
        _id: user.userId._id,
        authId: user._id,
        role: user.userId.role,
        name: `${user.userId.firstName} ${user.userId.lastName}`,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30days" }
    );
  },
};
module.exports = { authToken };
