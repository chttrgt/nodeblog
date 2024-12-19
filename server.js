const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv").config();
const router = require("./routes");
const formatDate = require("./helpers/generateDate");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.engine("handlebars", engine({ helpers: { formatDate } }));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    secret: "cihatturgut",
    resave: false,
    saveUninitialized: false,
  })
);

/* Flash - Message Middleware */
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

/* Display Links Middleware */

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      authLinks: true,
    };
  } else {
    res.locals = {
      authLinks: false,
    };
  }
  next();
});

app.use(fileUpload());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
