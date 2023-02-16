/**
 * 
 * @param {*} msg  A string that represents the success message.
 * @param {*} datas Any data that needs to be returned along with the success message.
 * @param {*} code  An optional parameter that represents the status code of the response. By default, it is set to 200. 
 */
const successMsg = function (msg, datas, code = 200) {
  error = { statuscode: code, err: 0, data: datas, sucmsg: msg };
  return error;
};
module.exports = { successMsg };
