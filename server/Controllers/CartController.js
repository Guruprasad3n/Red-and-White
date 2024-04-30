const cartModel = require("../Models/CartModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new cartModel({ products: [{ productId, quantity: 1 }] });
    } else {
      const existingProductIndex = cart.products.findIndex(
        (product) => product.productId === productId
      );
      if (existingProductIndex !== -1) {
        return res.status(400).json({ error: "Product already in cart" });
      }
      cart.products.push({ productId, quantity: 1 });
    }
    await cart.save();
    return res.status(201).json(cart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // Populate cart with product details
    const populatedCart = await cart
      .populate("products.productId")
      .execPopulate();
    return res.json(populatedCart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = { addToCart, getCart };
