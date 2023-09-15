import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);

interface IUser {
  name: string;
  email: string;
  password: string;
}

export async function createUser(user: IUser) {
  const userDoc = new User(user);
  return await userDoc.save();
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export default { createUser, getUserByEmail };
