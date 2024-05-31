import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const pubSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    category: { type: ObjectId, required: true, ref: "Category" },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Pub = mongoose.model("Pub", pubSchema);
export default Pub;
