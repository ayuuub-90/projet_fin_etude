import mongoose from "mongoose";

const categorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorSchema);
export default Category;
