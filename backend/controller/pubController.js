import Pub from "../models/pubModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { isValidObjectId } from "mongoose";

//create new Pub function
const createPub = asyncHandler(async (req, res) => {
  try {
    const { image, category, title, subTitle } = req.body;

    switch (true) {
      case !image:
        return res.json({ error: "Image is required" });
      case !title:
        return res.json({ error: "Title is required" });
      case !subTitle:
        return res.json({ error: "SubTitle is required" });
      case !category:
        return res.json({ error: "Category is required" });
    }
    //check if the category ID is valid
    if (!isValidObjectId(category)) {
      return res
        .status(404)
        .json({ message: `${category} is not a valid category Id` });
    }

    const duplicated = await Pub.findOne({ title });
    if (duplicated) {
      return res.status(404).json({ message: "Pub already exists" });
    }

    const pub = await Pub.create({ ...req.body });
    return res.status(201).json(pub);
    //////////////////////////////////////////
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update pub function
const editPub = asyncHandler(async (req, res) => {
  try {
    const { image, title, subTitle, category } = req.body;

    switch (true) {
      case !image:
        return res.json({ error: "Image is required" });
      case !title:
        return res.json({ error: "Title is required" });
      case !subTitle:
        return res.json({ error: "SubTitle is required" });
      case !category:
        return res.json({ error: "Category is required" });
    }

    const pub = await Pub.findById(req.params.id);
    if (!pub) {
      return res.status(404).json({ message: "No such pub found." });
    } else {
      pub.image = image;
      pub.title = title;
      pub.subTitle = subTitle;
      pub.category = category;
    }
    const pubEdited = await pub.save();
    return res.status(200).json(pubEdited);
    ////////////////////////////////
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//delete pub function
const deletePub = asyncHandler(async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) {
      return res.status(404).json({ message: "Pub Not Found" });
    } else {
      await pub.deleteOne();
      return res.status(200).json({ message: "Pub Delete Successfully" });
    }
    ///////////////////////////////////////////////
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get all pubs function
const getAllPub = asyncHandler(async (req, res) => {
  try {
    const pubs = await Pub.find({}).populate("category");
    return res.status(200).json(pubs);
    //////////////////////////////////
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get pub by id function
const getPubById = asyncHandler(async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) {
      return res.status(404).json({ message: "Pub Not Found" });
    } else {
      return res.status(200).json(pub);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export { createPub, editPub, deletePub, getAllPub, getPubById };
