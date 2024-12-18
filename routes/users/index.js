const express = require("express");
const router = express.Router();

const User = require("../../models/User");

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
      res.redirect("/auth/login");
    })
    .catch((error) => {
      console.log(error);
      res.send("An error occurred.");
    });
});

module.exports = router;
