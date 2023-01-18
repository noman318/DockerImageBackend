const errormsg = function (msg) {
  error = { err: 1, errmsg: msg };
  return error;
};
module.exports = { errormsg };
