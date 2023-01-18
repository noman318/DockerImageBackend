const successmsg = function (msg, datas) {
  error = { err: 0, data: datas, sucmsg: msg };
  return error;
};
module.exports = { successmsg };
