import mongoose, { ConnectOptions } from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
  } catch (err) {
    console.error(err);
  }
}
