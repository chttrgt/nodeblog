const express = require("express");
const router = express.Router();

const auth = require("./auth");
const main = require("./main");
const posts = require("./posts");
const users = require("./users");

router.use("/", main);
router.use("/auth", auth);
router.use("/posts", posts);
router.use("/users", users);

module.exports = router;
