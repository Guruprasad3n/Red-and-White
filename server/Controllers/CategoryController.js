const CategoryModel = require("../Models/CategoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new CategoryModel({ name });
    await newCategory.save();
    return res.status(201).send({ message: "Category Created", newCategory });
  } catch (err) {
    return res.status(500).send({ message: "Failed to create Category" });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).send({ message: "Here is All Categories ", categories });
  } catch (err) {
    return res.status(500).send({ message: "Error in getting All Categories" });
  }
};

module.exports = { createCategory, getAllCategories };
