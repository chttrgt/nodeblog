const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../../models/Post");
const Category = require("../../models/Category");

//#region GOTO ADD NEW POST PAGE
router.get("/new", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  Category.find({})
    .lean()
    .then((categories) => {
      res.render("pages/addNewPost", { categories });
    });
});
//#endregion

//#region GET SPECIFIC POST BY ID (PostDetails Page)
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .populate({ path: "author", select: "username" })
    .then((post) => {
      Category.aggregate([
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "category",
            as: "posts",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            postCount: { $size: "$posts" },
          },
        },
        {
          $match: {
            postCount: { $gt: 0 },
          },
        },
      ]).then((categories) => {
        Post.find({})
          .lean()
          .sort({ $natural: -1 })
          .then((posts) => {
            res.render("pages/postDetails", {
              post,
              categories,
              posts,
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

//#region ADD NEW POST
router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../../public/img/post-images", post_image.name)
  );

  Post.create({
    ...req.body,
    post_image: `/img/post-images/${post_image.name}`,
    author: req.session.userId,
  })
    .then(() => {
      req.session.flash = {
        type: "alert alert-success",
        message: "Post created successfully.",
      };
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

//#region SEARCH POSTS

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get("/search/query", (req, res) => {
  if (req.query.look) {
    const regex = new RegExp(escapeRegex(req.query.look), "gi");
    Post.find({ title: regex })
      .lean()
      .populate({ path: "author", select: "username" })
      .sort({ $natural: -1 })
      .then((posts) => {
        Category.aggregate([
          {
            $lookup: {
              from: "posts",
              localField: "_id",
              foreignField: "category",
              as: "posts",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              postCount: { $size: "$posts" },
            },
          },
          {
            $match: {
              postCount: { $gt: 0 },
            },
          },
        ]).then((categories) => {
          res.render("pages/blog", {
            categories,
            posts,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//#endregion

module.exports = router;
