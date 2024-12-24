const express = require("express");
const mongoose = require("mongoose");
const { create } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv").config();
const router = require("./routes");
const methodOverride = require("method-override");
const formatDate = require("./helpers/generateDate");
const limit = require("./helpers/limit").limit;
const truncate = require("./helpers/truncate").truncate;
const paginate = require("./helpers/paginate").paginate;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./models/User");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

const hbs = create({ helpers: { formatDate, limit, truncate, paginate } });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(methodOverride("_method"));
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

/* Flash - Message Middleware */
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

/* IsAdmin Middleware */

app.use((req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.locals.user = null;
    return next();
  }

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.locals.user = {
          username: user.username,
          avatar: user.avatar,
          profession: user.profession,
          isAdmin: user.role === "admin",
        };
      } else {
        res.locals.user = null;
      }
      next();
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.locals.user = null;
      next();
    });
});

app.use(fileUpload());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
