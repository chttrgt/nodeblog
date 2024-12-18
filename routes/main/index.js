const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

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
  Post.find({})
    .lean()
    .then((posts) => {
      res.render("pages/blog", { posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
