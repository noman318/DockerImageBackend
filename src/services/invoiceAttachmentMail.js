const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();
/**
 *Creating a nodemailer transporter for Gmail
 */
let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
}); //Nodemailer Tunneling

transporter.use(
    "compile",
    hbs({
        viewEngine: "nodemailer-express-handlebars",
        viewPath: "src/views/Templates/",
    })
); //Setting up Email Template

const invoiceAttachmentEmail = (data) => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: data.payer.payer_info.email,
        subject: "Thanks, Please refer Invoice",
        template: "invoiceMail",
        attachments: data.cart
            ? [
                {
                    filename: `${data.cart}.pdf`,
                    path: path.join(`./invoiceFiles/${data.cart}.pdf`),
                    contentType: "application/pdf",
                },
            ]
            : undefined,
    };

    //Email Sending
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("sended email with attachment");
        }
    });
};

module.exports = { invoiceAttachmentEmail };
