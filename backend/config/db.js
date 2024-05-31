import mongoose from "mongoose";

const connerctDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.log("error: " + error);
    process.exit(1);
  }
};

export default connerctDB;