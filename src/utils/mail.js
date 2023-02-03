const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path=require('path');
async function sendMailer(email, resetToken, sub, temp, uId,data) {
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
    to: email?email:data.payer.payer_info.email,
    subject: sub,
    template: temp,
    context:uId? {
      token: resetToken,
      id: uId,
    }:{},
    attachments: data ?[
      {
          filename: `${data.cart}.pdf`, 
          path: path.join(`./invoiceFiles/${data.cart}.pdf`), 
          contentType: 'application/pdf'
      }
  ] : "",
  };
  return await mailTransporter.sendMail(mailDetails);
}
module.exports = { sendMailer };
