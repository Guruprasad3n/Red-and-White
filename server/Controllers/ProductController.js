const fs = require("fs");
const cartModel = require("../Models/CartModel");

const Product = require("../Models/ProductModel");

const createProduct = async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      price,
      oldPrice,
      rating,
      inStock,
      image,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !image ||
      !rating ||
      !oldPrice ||
      !inStock
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }

    const newProduct = new Product({
      category,
      title,
      description,
      price,
      oldPrice,
      rating,
      inStock,
      image,
    });

    await newProduct.save();
    return res
      .status(201)
      .send({ message: "Product Created Success", newProduct });
  } catch (err) {
    return res.status(500).send({ message: "Failed to Create Product" });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { category } = req.query;
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find({})
        .populate("category")
        .limit(10)
        .sort({ createsAt: -1 });
    }
    return res.status(200).send({
      message: "Successfully  Fetched all Products",
      total: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).send({ message: "failed to fetch all Products" });
  }
};

module.exports = { createProduct, getAllProduct };
