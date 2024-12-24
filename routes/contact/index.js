const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//#region GET /contact

router.post("/email", (req, res) => {
  const outputHTML = `
    
    <h2>Message Details</h2>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Message: ${req.body.message}</li>
    </ul>
    
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "kendi gmail hesabınız",
      pass: "kendi gmail hesabınızın şifresi ya da uygulama şifresi oluşturabilirsiniz",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Node Project Contact Form 👻" <kendi-gmailiniz@gmail.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    req.session.flash = {
      type: "alert alert-success",
      message: "Your message has been sent successfully",
    };
    res.redirect("/contact");
  }

  main().catch(console.error);
});

//#endregion

module.exports = router;
