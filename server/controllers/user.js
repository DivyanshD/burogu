import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "30d",
    });

    res.status(200).json({ data: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password === confirm_password) {
    try {
      const oldUser = await UserModal.findOne({ email });

      if (oldUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 12);

      const data = await UserModal.create({
        email,
        password: hashedPassword,
        name: username,
      });

      const token = jwt.sign({ email: data.email, id: data._id }, secret, {
        expiresIn: "30d",
      });

      res.status(201).json({ data, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });

      console.log(error);
    }
  } else {
    res.status(400).json({ message: "Password does not match" });
  }
};
