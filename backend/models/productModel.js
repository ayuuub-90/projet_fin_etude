import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: {
      image1: { type: String, required: true },
      image2: { type: String},
      image3: { type: String},
    },
    // quantity: { type: Number, required: true, default: 0 }, // use just in order case
    rating: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, default: 1 },
    numReviews: { type: Number, default: 0 },

    reviews: [reviewSchema],

    category: {       type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
    brand: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
