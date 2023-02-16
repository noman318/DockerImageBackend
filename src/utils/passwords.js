const bcrypt = require("bcrypt");
/**
 *@description function to encrypt the password
 */
const passWord = {
  encruptPassword: function (pass) {
    console.log('pass :>> ', pass);
    const hash = bcrypt.hashSync(pass, Number(process.env.SALT_ROUNDS));
    console.log('hash', hash)
    return hash;
  },
  /**
   * @description function to decrypt the password and check if it matches the old password
   */
  decruptPassword: function (oldPass, newPass) {
    const isValid = bcrypt.compare(oldPass, newPass);
    return isValid;
  },
};
module.exports = { passWord };
