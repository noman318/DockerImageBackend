const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
async function sendMailer(email, resetToken, sub, temp, uId) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  mailTransporter.use(
    "compile",
    hbs({
      viewEngine: "nodemailer-express-handlebars",
      viewPath: "src/views/Templates/",
    })
  );

  let mailDetails = {
    from: process.env.EMAIL,
    to: email,
    subject: sub,
    template: temp,
    context: {
      token: resetToken,
      id: uId,
    },
  };
  return await mailTransporter.sendMail(mailDetails);
}
module.exports = { sendMailer };
