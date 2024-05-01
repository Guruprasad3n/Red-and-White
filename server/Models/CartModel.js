const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
