import Brand from "../models/brandModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//create a new category function
const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name ) {
      return res.status(404).json({ message: "brand name is required" });
    }
    const existBrand = await Brand.findOne({ name: name });
    if (existBrand) {
      return res.status(404).json({ message: "brand already exists" });
    }
    const brand = await Brand.create({ name: name, image: image });
    if (brand) {
      res.status(201).json(brand);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update brand by id function
const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({ message: `Invalid brand name ${name}` });
    }
    const brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ message: "Invalid brand Id" });
    } else {
      brand.name = name || brand.name;
    }
    const updatedBrand = await brand.save();
    res.status(201).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update brand by id function
const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    } else {
      await brand.deleteOne();
      res.status(200).json({ message: "Brand deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get all brands function
const getAllBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get brand by id function
const getBrandById = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
};
