const nodemailer = require("nodemailer");
const { errormsg } = require("./error");
const { successmsg } = require("./success");

async function sendMailer(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "galineelam10@gmail.com",
      pass: "swfhmwfdmqnzvkqx",
    },
  });

  let mailDetails = {
    from: "galineelam10@gmail.com",
    to: email,
    subject: "Reset Password Link",
    html: " <p> <a href='http://localhost:3000/changepasswordscreen'>Click Here </a> </p>",
  };
  return await mailTransporter.sendMail(mailDetails);
}
module.exports = { sendMailer };
