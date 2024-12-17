const express = require("express");
const router = express.Router();

router.get("/blog/new", (req, res) => {
  res.render("pages/addNewPost");
});

router.post("/posts/test", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
