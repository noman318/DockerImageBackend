const bcrypt = require("bcrypt");

const passWord = {
  encruptPassword: function (pass) {
    const hash = bcrypt.hashSync(pass, Number(process.env.SALT_ROUNDS));
    return hash;
  },
  decruptPassword: function (oldPass, newPass) {
    const isValid = bcrypt.compare(oldPass, newPass);
    return isValid;
  },
};
module.exports = { passWord };
