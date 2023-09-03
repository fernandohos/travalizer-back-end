import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3030;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
})