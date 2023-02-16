
const errorMsg = function (msg, code) {
  error = { statuscode: code, err: 1, errmsg: msg };
  return error;
};
module.exports = { errorMsg };
