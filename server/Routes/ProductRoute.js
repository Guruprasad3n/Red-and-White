const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductById,
} = require("../Controllers/ProductController");
const {
  createCategory,
  getAllCategories,
} = require("../Controllers/CategoryController");
const { addToCart, getCart, updateCartQuantity, removeCartItem } = require("../Controllers/CartController");

const router = express.Router();

router.post("/create-category", createCategory);
router.post("/create-product", createProduct);
router.get('/product/:productId', getProductById);
router.post("/add-cart", addToCart);
router.get("/products", getAllProduct);
router.get("/categories", getAllCategories);
router.get("/cart", getCart);
router.post('/cart/increment', updateCartQuantity);
router.delete('/cart/:productId', removeCartItem);

module.exports = router;
