const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("pages/login");
});
router.get("/register", (req, res) => {
  res.render("pages/register");
});

module.exports = router;
