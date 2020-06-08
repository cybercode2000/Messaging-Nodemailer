const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", (req, res) => {
    const { username, message, receiverEmail } = req.body
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kvote3084@gmail.com",
        pass: "cybercode2020"
      }
    });

    let mailOptions = {
      from: "kvote3084@gmail.com",
      to: `${receiverEmail}`,
      subject: "Testing nodemailer",
      text: `Dear ${username} ${message}`
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
          res.send("error occur");
          console.log(err);
      }
      if (data) {
        res.send("message sent successfully");
      }
    });

})

module.exports = app;
