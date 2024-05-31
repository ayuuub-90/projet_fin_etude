import express from "express";
const router = express.Router();

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddelwares.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  markOrderAsPaid,
  markOrderAsDelivred,
  getOrderByUser,
  getTotalOrders,
  getTotalSales,
  getTotalSalesByDate,
} from "../controller/orderController.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/total-orders").get(authenticate, authorizeAdmin, getTotalOrders);


router.route("/my-orders").get(authenticate, authorizeAdmin, getOrderByUser);

router.route("/total-sales").get(authenticate, authorizeAdmin, getTotalSales);
router
  .route("/total-sales-by-date")
  .get(authenticate, authorizeAdmin, getTotalSalesByDate);

router.route("/:id").get(authenticate, getOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivred);

export default router;
