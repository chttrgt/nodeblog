const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.get("/new", (req, res) => {
  res.render("pages/addNewPost");
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
