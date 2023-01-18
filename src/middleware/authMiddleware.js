const jwt = require("jsonwebtoken");
const authToken = {
  jwtvalidate: function () {
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
        _id: user.userid._id,
        name: `${user.userid.firstname} ${user.userid.lastname}`,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30days" }
    );
  },
};
module.exports = { authToken };
