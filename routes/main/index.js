const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");
const Category = require("../../models/Category");

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

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

router.get("/blog", (req, res) => {
  Post.find({})
    .lean()
    .sort({ $natural: -1 })
    .then((posts) => {
      Category.find({})
        .lean()
        .then((categories) => {
          res.render("pages/blog", { posts, categories });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
