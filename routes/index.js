const express = require("express");
const router = express.Router();

const auth = require("./auth");
const main = require("./main");
const posts = require("./posts");
const users = require("./users");
const contact = require("./contact");

router.use("/", main);
router.use("/auth", auth);
router.use("/posts", posts);
router.use("/users", users);
router.use("/contact", contact);

module.exports = router;
