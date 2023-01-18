const bcrypt = require("bcrypt");

const passWord = {
  encpass: function (pass) {
    const hash = bcrypt.hashSync(pass, Number(process.env.SALT_ROUNDS));
    return hash;
  },
  decruptpass: function (oldpass, newpass) {
    const isvalid = bcrypt.compare(oldpass, newpass);
    return isvalid;
  },
};
module.exports = { passWord };
