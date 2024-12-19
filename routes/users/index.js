const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Oturum silinirken hata oluştu:", err);
      return res.send("Logout sırasında bir hata oluştu.");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.post("/register", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      req.session.flash = {
        type: "alert alert-success",
        message: "User created successfully.",
      };
      res.redirect("/auth/login");
    })
    .catch((error) => {
      console.log(error);
      res.send("An error occurred.");
    });
});

module.exports = router;
