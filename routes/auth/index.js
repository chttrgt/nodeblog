const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Please provide an email and password.");
    res.redirect("/auth/login");
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/users/register");
      }

      if (password !== user.password) {
        return res.redirect("/auth/login");
      }

      req.session.userId = user._id;
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.send("An error occurred.");
    });
});

module.exports = router;
