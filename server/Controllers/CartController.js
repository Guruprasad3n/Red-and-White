const cartModel = require("../Models/CartModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await cartModel.findOne({ productId });

    if (!cart) {
      const newCartPorduct = new cartModel({ productId, quantity: 1 });
      await newCartPorduct.save();
      return res.status(200).json({ message: "Product Added to the cart " });
    } else {
      await cartModel.findByIdAndUpdate(cart._id, {
        quantity: cart.quantity + 1,
      });
      return res.status(400).json({ message: "Product already in cart " });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await cartModel.find().populate("productId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    return res.send(cart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, incrementBy } = req.body;
    let cartItem = await cartModel.findOne({ productId });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    cartItem.quantity += incrementBy;
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Cart quantity updated successfully" });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cartItem = await cartModel.findOneAndDelete({ productId });
    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    return res
      .status(200)
      .json({ message: "Item removed from cart successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addToCart, getCart, updateCartQuantity, removeCartItem };
