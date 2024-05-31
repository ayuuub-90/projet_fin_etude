import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//create a new category function
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(404).json({ message: "category name or image is required" });
    }
    const existCategory = await Category.findOne({ name: name });
    if (existCategory) {
      return res.status(404).json({ message: "category already exists" });
    }
    const category = await Category.create({ name: name, image: image });
    if (category) {
      res.status(201).json(category);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update category by id function
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({ message: `Invalid category name ${name}` });
    }
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: "Invalid category Id" });
    } else {
      category.name = name || category.name;
    }
    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update category by id function
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    } else {
      await category.deleteOne();
      res.status(200).json({ message: "Category deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get all categories function
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get ategory by id function
const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
