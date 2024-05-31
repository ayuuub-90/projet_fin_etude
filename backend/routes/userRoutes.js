import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  currentUser,
  updateCurrentUser,
  addShippingAddress,
  changeCurrentPassword
} from "../controller/userController.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddelwares.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticate, logoutUser);
router.route("/").get(authenticate, authorizeAdmin, getAllUsers);
router
  .route("/profile")
  .get(authenticate, currentUser)
  .put(authenticate, updateCurrentUser)
  .post(authenticate, addShippingAddress)
  .patch(authenticate, changeCurrentPassword)
router
  .route("/:id")
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)
  .delete(authenticate, authorizeAdmin, deleteUser);

export default router;
