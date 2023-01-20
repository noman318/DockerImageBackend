const successMsg = function (msg, datas, code = 200) {
  error = { statuscode: code, err: 0, data: datas, sucmsg: msg };
  return error;
};
module.exports = { successMsg };
