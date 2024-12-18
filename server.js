const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv").config();
const router = require("./routes");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
