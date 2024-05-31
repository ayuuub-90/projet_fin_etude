import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },

    shippingAddress: {
      address: { type: String },
      country: { type: String },
      city: { type: String },
      postalCode: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
