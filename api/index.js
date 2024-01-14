import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import morgan from "morgan";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
