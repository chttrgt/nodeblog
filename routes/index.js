const express = require("express");
const router = express.Router();

const auth = require("./auth");
const main = require("./main");
const posts = require("./posts");

router.use("/", main);
router.use("/auth", auth);
router.use("/posts", posts);

module.exports = router;
