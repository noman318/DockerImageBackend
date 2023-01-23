const bcrypt = require("bcrypt");

const encpassword = function (pass) {
  bcrypt.hash(pass, process.env.saltRounds);
};
module.exports = { encpassword };
