import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

// to make the app use json to understand the data
app.use(express.json());
// using cors
app.use(cors());

// use routes
app.use(userRoutes);
// connect Database
await connectDB();

// starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
