const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");
const Category = require("../../models/Category");
const User = require("../../models/User");

//#region Anasayfayı yükle
router.get("/", (req, res) => {
  res.render("pages/index");
});
//#endregion

//#region Hakkımızda sayfasını yükle
router.get("/about", (req, res) => {
  res.render("pages/about");
});
//#endregion

//#region İlteşim sayfasını yükle
router.get("/contact", (req, res) => {
  res.render("pages/contact");
});
//#endregion

//#region KULLANICI ADMIN İSE KATEGORİ İŞLEMLERİ

//#region Kullanıcı admin ise admin sayfasına yönlendir
router.get("/admin", isAdminMiddleware, async (req, res) => {
  try {
    res.render("pages/admin");
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
});
//#endregion

//#region Kullanıcı admin ise kategori ekleme sayfasına yönlendir
router.get("/admin/categories", isAdminMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort({ createdAt: "desc" })
      .lean();
    res.render("pages/category", { categories });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
});
//#endregion

//#region Kullanıcı admin ise yeni kategori ekleme işlemini yap
router.post("/admin/categories", isAdminMiddleware, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      return res.status(400).send("Category could not be created.");
    }

    res.redirect("/admin/categories");
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
});
//#endregion

//#region Kullanıcı admin ise kategori silme işlemini yap
router.delete(
  "/admin/categories/:catId",
  isAdminMiddleware,
  async (req, res) => {
    try {
      const { catId } = req.params;
      const category = await Category.findByIdAndDelete(catId);
      if (!category) {
        return res.status(400).send("Category could not be deleted.");
      }
      res.redirect("/admin/categories");
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("An error occurred.");
    }
  }
);
//#endregion

//#endregion

//#region KULLANICI ADMIN İSE POST İŞLEMLERİ

//#region Kullanıcı admin ise post ekleme sayfasına yönlendir
router.get("/admin/posts", isAdminMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({})
      .lean()
      .populate({ path: "category", select: "name" })
      .sort({ $natural: -1 });
    res.render("pages/posts", { posts });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
});
//#endregion

//#region Kullanıcı admin ise post editleme sayfasına yönlendir
router.get("/admin/posts/:pId", isAdminMiddleware, async (req, res) => {
  try {
    const { pId } = req.params;
    const post = await Post.findById(pId)
      .lean()
      .populate({ path: "category", model: Category });
    const categories = await Category.find({}).lean();
    const selectedCategory = await Category.findById(post.category._id).lean();
    res.render("pages/editpost", { post, categories, selectedCategory });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
});
//#endregion

//#region Kullanıcı admin ise post düzenleme işlemini yap
const path = require("path");

router.put("/admin/posts/:pId", async (req, res) => {
  try {
    const postId = req.params.pId;

    let updatedPost = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    };

    if (req.files && req.files.post_image) {
      const post_image = req.files.post_image;

      const uploadPath = path.resolve(
        __dirname,
        "../../public/img/post-images",
        post_image.name
      );
      await post_image.mv(uploadPath);

      updatedPost.post_image = `/img/post-images/${post_image.name}`;
    }

    await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
      runValidators: true,
    });
    res.redirect("/admin/posts");
  } catch (error) {
    console.error(error);
  }
});

//#endregion

//#region Kullanıcı admin ise post silme işlemini yap
router.delete("/admin/posts/:pId", isAdminMiddleware, async (req, res) => {
  try {
    const { pId } = req.params;
    const post = await Post.findByIdAndDelete(pId);
    if (!post) {
      return res.status(400).send("Post could not be deleted.");
    }
    res.redirect("/admin/posts");
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred.");
  }
});
//#endregion

//#endregion

//#region Blog sayfasını yükle
router.get("/blog", (req, res) => {
  const postPerPage = 4;
  const page = req.query.page || 1;

  Post.find({})
    .lean()
    .populate({ path: "author", model: User })
    .sort({ $natural: -1 })
    .skip(postPerPage * page - postPerPage)
    .limit(postPerPage)
    .then((posts) => {
      Post.countDocuments().then((postCount) => {
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
        ])
          .then((categories) => {
            res.render("pages/blog", {
              posts,
              categories,
              current: parseInt(page),
              pages: Math.ceil(postCount / postPerPage),
            });
          })
          .catch((err) => {
            console.log("Error in category aggregation:", err);
            res.status(500).send("Internal Server Error");
          });
      });
    })
    .catch((err) => {
      console.log("Error in post query:", err);
      res.status(500).send("Internal Server Error");
    });
});

//#endregion

//#region Filtrelenmiş Blog sayfası yükle
router.get("/category/blog/:catId", (req, res) => {
  Post.find({ category: req.params.catId })
    .lean()
    .populate({ path: "author", model: User })
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
      ])
        .then((categories) => {
          res.render("pages/blog", { posts, categories });
        })
        .catch((err) => {
          console.log("Error in category aggregation:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.log("Error in post query:", err);
      res.status(500).send("Internal Server Error");
    });
});

//#endregion

module.exports = router;
