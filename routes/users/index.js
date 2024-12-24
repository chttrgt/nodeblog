const express = require("express");
const router = express.Router();

const User = require("../../models/User");

//#region LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error deleting session:", err);
      return res.send("An error occurred during logout.");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});
//#endregion

//#region REGISTERING
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
//#endregion

module.exports = router;
