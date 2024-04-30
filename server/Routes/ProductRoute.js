const express = require("express");
const {
  createProduct,
  getAllProduct,
} = require("../Controllers/ProductController");
const {
  createCategory,
  getAllCategories,
} = require("../Controllers/CategoryController");
const { addToCart, getCart } = require("../Controllers/CartController");

const router = express.Router();

router.post("/create-category", createCategory);
router.post("/create-product", createProduct);
router.post("/add-cart", addToCart);
router.get("/products", getAllProduct);
router.get("/categories", getAllCategories);
router.get("/cart", getCart);

module.exports = router;
