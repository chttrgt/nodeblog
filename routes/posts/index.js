const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../../models/Post");

router.get("/new", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  res.render("pages/addNewPost");
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .then((post) => {
      res.render("pages/postDetails", { post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../../public/img/post-images", post_image.name)
  );

  Post.create({
    ...req.body,
    post_image: `/img/post-images/${post_image.name}`,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
