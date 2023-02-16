const bcrypt = require("bcrypt");
/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
const encpassword = function (pass) {
  bcrypt.hash(pass, process.env.saltRounds);
};
module.exports = { encpassword };
