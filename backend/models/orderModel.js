import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

    order_items: [],

    status: {
      is_livred: { type: Boolean, required: true, default: false },
      livred_at: { type: Date },
      is_paid: { type: Boolean, required: true, default: false },
      paid_at: { type: Date },
    },

    shipping_price: { type: Number, required: true, default: 0.0 }, // 29.00 $
    items_price: { type: Number, required: true, default: 0.0 }, // quantity * price

    totalPrice: { type: Number, required: true, default: 0.0 }, // shipping price + items price

    payment_infos: {
      cardCvv: { type: String, required: true },
      cardExpiration: { type: String, required: true },
      cardName: { type: String, required: true },
      cardNumber: { type: String, required: true },
      paymentMethod: { type: String, required: true },
    },

    shipping_address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
