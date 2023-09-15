import { validateEmail } from "@helpers/validateEmail";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { capitalizeFirstLetters } from "@helpers/capitalizeFirstLetter";
import userModel from "@models/user";
import jwt from "jsonwebtoken";

async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  // validate inputs
  if (!name || !email || !password) {
    res.status(400).json({ message: "All inputs is required!" });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email type!" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password must have at least 6 characters!" });
    return;
  }

  if (name.length < 2) {
    res.status(400).json({ message: "Name must have at least 2 characters!" });
    return;
  }

  // validate if exists
  const userByEmail = await userModel.getUserByEmail(email.toLowerCase());

  if (userByEmail) {
    res.status(409).json({ message: "User already exists!" });
    return;
  }

  // create user
  const encryptedPassword = bcrypt.hashSync(password, 10);

  const user = {
    name: capitalizeFirstLetters(name),
    email: email.toLowerCase(),
    password: encryptedPassword,
  };

  const createdUser = await userModel.createUser(user);

  // log user in
  try {
    if (!process.env.JWT_KEY) {
      res.status(500).json({ message: "Internal Server Error!" });
      throw new Error("JWT_KEY missing from environment variables!");
    } else {
      const token = jwt.sign(user, process.env.JWT_KEY, {
        expiresIn: "2h",
      });

      res.status(200).json({ token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }

  return createdUser;
}

function login(req: Request, res: Response) {}

export default { register, login };
