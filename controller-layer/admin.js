const express = require("express");
const router = express.Router();

const { checkIfAuthenticated } = require("../middleware");

const models = require("../models");
const modelforms = require("../forms");

const productRoutes = require("./admin/product");
const brandsRoutes = require("./admin/brands");
const userRoutes = require("./admin/users");
const rolesRoutes = require("./admin/roles");
const categoriesRoutes = require("./admin/category");
const reviewsRoutes = require("./admin/reviews");
const newsRoutes = require("./admin/news");
const commentsRoutes = require("./admin/comments");
const orderRoutes = require("./admin/order");
const orderItemsRoutes = require("./admin/orderitems");
const orderStatusesRoutes = require("./admin/order-status");
const cartItemsRoutes = require("./admin/cartitem");

router.get("/", checkIfAuthenticated, function (req, res) {
  res.render("admin/index");
});

router.use("/products", checkIfAuthenticated, productRoutes);
router.use("/users", userRoutes);
router.use("/brands", checkIfAuthenticated, brandsRoutes);
router.use("/roles", checkIfAuthenticated, rolesRoutes);
router.use("/categories", checkIfAuthenticated, categoriesRoutes);
router.use("/reviews", checkIfAuthenticated, reviewsRoutes);
router.use("/news", checkIfAuthenticated, newsRoutes);
router.use("/comments", checkIfAuthenticated, commentsRoutes);
router.use("/orders", checkIfAuthenticated, orderRoutes);
router.use("/orderitems", checkIfAuthenticated, orderItemsRoutes);
router.use("/orderstatus", checkIfAuthenticated, orderStatusesRoutes);
router.use("/cartitems", checkIfAuthenticated, cartItemsRoutes);

module.exports = router;
