import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { isValidObjectId } from "mongoose";

// create new Product function
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images: { image1, image2, image3 },
      brand,
      category,
      countInStock,
    } = req.body;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !countInStock:
        return res.json({ error: "count in stock is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image1:
        return res.json({ error: "Image one is required" });
      case !image2:
        return res.json({ error: "Image two is required" });
      case !image3:
        return res.json({ error: "Image three is required" });
    }

    const existProduct = await Product.findOne({ name });
    if (existProduct) {
      return res
        .status(404)
        .json({ message: `${existProduct.name}, already exists` });
    }

    if (!isValidObjectId(category)) {
      return res
        .status(404)
        .json({ message: `${category} is not a valid brand Id` });
    }

    if (!isValidObjectId(brand)) {
      return res
        .status(404)
        .json({ message: `${brand} is not a valid category Id` });
    }

    const product = await Product.create({ ...req.body });
    if (product) {
      return res.status(201).json(product);
    } else {
      return res
        .status(404)
        .json({ message: "Something went wrong, Try again" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// delete product by id function
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = await product.deleteOne();
    return res
      .status(200)
      .json({ message: `${product.name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// update product by id function
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      images: { image1, image2, image3 },
    } = req.body;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !countInStock:
        return res.json({ error: "count in stock is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image1:
        return res.json({ error: "Image one is required" });
      case !image2:
        return res.json({ error: "Image two is required" });
      case !image3:
        return res.json({ error: "Image three is required" });
    }

    if (category) {
      if (!isValidObjectId(category)) {
        return res
          .status(404)
          .json({ message: `${category} is not a valid category Id` });
      }
    }
    console.log(category);

    if (brand) {
      if (!isValidObjectId(brand)) {
        return res
          .status(404)
          .json({ message: `${brand} is not a valid brand Id` });
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      product.name = name;
      product.description = description;
      product.category = category;
      product.price = price;
      product.brand = brand;
      product.images.image1 = image1;
      product.images.image2 = image2;
      product.images.image3 = image3;
      product.countInStock = countInStock;
    }
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get all products function
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .populate("brand");
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get produt by id function
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("brand");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log(error);
  }
});

// get product by rating (top products)
const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ rating: -1 })
      .populate("category")
      .populate("brand")
      .limit(9);
    if (!products.length) {
      return res
        .status(400)
        .json({ message: "There are no products available" });
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get product by date (new products)
const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("brand")
      .limit(9);
    if (!products.length) {
      return res
        .status(400)
        .json({ message: "There are no products available" });
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// add product review function
const addReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!rating || !comment) {
      return res.status(404).json({ message: "All fields are required" });
    }

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Product already reviewed" });
      }

      const review = {
        name: req.user.firstname + " " + req.user.lastname,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// filter product function
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args).populate("brand");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
const getProductByCategory = asyncHandler(async (req, res) => {
 
  try {
    const categoryId = req.params.categoryId; 
    const products = await Product.find({ category: categoryId }) 
      .populate("category") // Peupler la référence de catégorie


    if (!products.length) {
      return res.status(400).json({ message: "Aucun produit disponible pour cette catégorie" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getTopProducts,
  getNewProducts,
  addReview,
  filterProducts,
  getProductByCategory,
};
