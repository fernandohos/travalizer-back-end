import express from "express";
import dotenv from "dotenv";
import authRouter from "@routes/auth";
import { connectDb } from "@config/db";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3030;
connectDb();

const app = express();

app.use(authRouter);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
