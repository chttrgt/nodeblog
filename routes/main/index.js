const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");
const User = require("../../models/User");

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("/admin", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    if (user.role !== "admin") {
      return res.status(403).send("Access denied.");
    }

    res.render("pages/admin");
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
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
