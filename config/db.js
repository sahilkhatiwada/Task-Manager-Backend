import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.log(error.message, "MongoDB connection error");
  }
};

export default connectDB;
