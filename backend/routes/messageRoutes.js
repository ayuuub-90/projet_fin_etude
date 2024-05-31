import express from "express";
const router = express.Router();
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controller/messageController.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddelwares.js";

router
  .route("/")
  .post(sendMessage)
  .get(authenticate, authorizeAdmin, getMessages);

router.route("/:id").delete(authenticate, authorizeAdmin, deleteMessage);

export default router;
