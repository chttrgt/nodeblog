const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../../models/Post");
const Category = require("../../models/Category");

router.get("/new", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  Category.find({})
    .lean()
    .then((categories) => {
      res.render("pages/addNewPost", { categories });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .then((post) => {
      Category.find({})
        .lean()
        .then((categories) => {
          res.render("pages/postDetails", { post, categories });
        });
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
      req.session.flash = {
        type: "alert alert-success",
        message: "Post created successfully.",
      };
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
