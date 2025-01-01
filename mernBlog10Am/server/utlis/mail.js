const { model } = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rw8.diwakar.us@gmail.com",
    pass: process.env.PRIVATE_EMAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function SendEmail(email, htmltemplate) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "rw8.diwakar.us@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Verfication ✔", // Subject line
    html: htmltemplate, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = SendEmail;
