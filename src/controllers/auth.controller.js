import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import accessToken from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userFound) return res.status(400).json(["The email already exists"]);

    const hashPwd = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPwd,
      },
    });

    const token = await accessToken({ id: newUser.id });
    res.cookie("token", token);

    res.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!foundUser) return res.status(404).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) return res.status(401).json(["Invalid Credentials"]);

    const token = await accessToken({ id: foundUser.id });
    res.cookie("token", token);

    res.json({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const profile = async (req, res) => {
  const userId = req.user.id;

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!foundUser) return res.status(404).json(["User not found"]);

    return res.json({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "");
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["Unathorized"]);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["Unathorized"]);

    const foundUser = await prisma.user.findFirst({
      where: {
        id: parseInt(user.id),
      },
    });
    if (!foundUser) return res.status(401).json(["Unathorized"]);

    return res.json({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    });
  });
};
