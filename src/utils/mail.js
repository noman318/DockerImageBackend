const nodemailer = require("nodemailer");

function mymail(req, res, email) {
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
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      res.json("Error Occurs");
    } else {
      res.json("Email sent successfully");
    }
  });
}
module.exports = { mymail };
