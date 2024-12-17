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
router.get("/blog/new", (req, res) => {
  res.render("pages/addNewPost");
});
router.get("/login", (req, res) => {
  res.render("pages/login");
});
router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.post("/posts/test", (req, res) => {
  res.redirect("/");
});

module.exports = router;
