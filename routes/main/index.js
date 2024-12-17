const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});
router.get("/about", (req, res) => {
  res.render("pages/about");
});
router.get("/contact", (req, res) => {
  res.render("pages/contact");
});
router.get("/blog", (req, res) => {
  res.render("pages/blog");
});

module.exports = router;
