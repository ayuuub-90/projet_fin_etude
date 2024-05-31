import Message from "../models/messageModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// send message function
const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, reason, content } = req.body;
    if (!firstname || !lastname || !email || !reason || !content) {
      return res.status(404).json({ message: "All fields required" });
    }
    const message = await Message.create({
      firstname,
      lastname,
      email,
      reason,
      content,
    });
    if (message) {
      return res.status(201).json(message);
    } else {
      return res
        .status(404)
        .json({ message: "something went wrong, Try again" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get all messages function
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({});
    return res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//delete message by id function
const deleteMessage = asyncHandler(async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(403).json({ message: "Message id not found" });
    }
    await message.deleteOne();
    return res
      .status(200)
      .json({ message: `${req.params.id} deleted successfuly` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export { sendMessage, getMessages, deleteMessage };
