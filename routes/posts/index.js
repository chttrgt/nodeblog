const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.get("/new", (req, res) => {
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
  Post.create(req.body)
    .then(() => {
      console.log(req.body);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
