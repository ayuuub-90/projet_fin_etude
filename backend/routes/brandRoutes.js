import express from "express";
const router = express.Router();
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddelwares.js";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
} from "../controller/brandController.js";

router
  .route("/")
  .post(authenticate, authorizeAdmin, createBrand)
  .get(authenticate, authorizeAdmin, getAllBrands);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateBrand)
  .delete(authenticate, authorizeAdmin, deleteBrand)
  .get(authenticate, authorizeAdmin, getBrandById);

export default router;
