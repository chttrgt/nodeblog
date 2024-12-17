const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv").config();

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("pages/index");
});
app.get("/about", (req, res) => {
  res.render("pages/about");
});
app.get("/contact", (req, res) => {
  res.render("pages/contact");
});
app.get("/blog", (req, res) => {
  res.render("pages/blog");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
