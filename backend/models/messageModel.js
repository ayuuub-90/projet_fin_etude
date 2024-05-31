import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    reason: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
