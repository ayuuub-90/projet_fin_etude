import Order from "../models/orderModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// create Order function
const createOrder = asyncHandler(async (req, res) => {
  try {
    const {
      order_items,
      shipping_address,
      payment_infos,
      items_price,
      shipping_price,
      totalPrice,
    } = req.body;

    if (order_items && order_items.length === 0) {
      return res.status(404).json({ message: "No order items found." });
    }

    const order = new Order({
      order_items: order_items,
      user: req.user._id,
      payment_infos,
      shipping_address,
      items_price,
      shipping_price,
      totalPrice,
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get all Orders function
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get order by id function
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ _id: req.params.id }).populate("user");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// mark order as delivered function
const markOrderAsDelivred = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status.is_livred = true;
      order.status.livred_at = Date.now();
    }
    const updatedOrder = await order.save();
    return res.status(201).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// mark order as paid function
const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status.is_paid = true;
      order.status.paid_at = Date.now();
    }
    const updatedOrder = await order.save();
    return res.status(201).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// ! part for the dashboard side

// get orders placed by user function
const getOrderByUser = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("user");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get total sales order fuction
const getTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    return res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get total sales order by date function
const getTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          "status.is_paid": true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$status.paid_at" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    return res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get total orders count function
const getTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUser,
  markOrderAsDelivred,
  markOrderAsPaid,
  getTotalSales,
  getTotalSalesByDate,
  getTotalOrders,
};
