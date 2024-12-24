const User = require("../models/User");

const isAdminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    if (user.role !== "admin") {
      return res.status(403).send("Access denied.");
    }

    next();
  } catch (err) {
    console.error("Error in isAdminMiddleware:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = isAdminMiddleware;
