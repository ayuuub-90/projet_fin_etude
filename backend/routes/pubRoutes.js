import express from "express";
const router = express.Router();
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddelwares.js";

import {
  createPub,
  editPub,
  deletePub,
  getAllPub,
  getPubById,
} from "../controller/pubController.js";

router
  .route("/")
  .post(authenticate, authorizeAdmin, createPub)
  .get(getAllPub);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, editPub)
  .delete(authenticate, authorizeAdmin, deletePub)
  .get(getPubById);

export default router;
