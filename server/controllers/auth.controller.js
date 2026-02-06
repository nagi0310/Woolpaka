import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token: ${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attack (cross-site scripting attack)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack (cross-site request forgery attack)
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attack (cross-site scripting attack)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack (cross-site request forgery attack)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new account
    const user = await User.create({ name, email, password });

    // Authenticate the user
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    // Check if password matches
    const pass = await user.comparePassword(password);
    if (pass) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // delete refreshToken from redis
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      redis.del(`refresh_token: ${decoded.userId}`);
    }

    // clear cookies from browser
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// To recreate access token
export const recreateToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ message: "Refresh Token not found" });
    }

    // decode the user
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // authenticate the token
    const storedToken = await redis.get(`refresh_token: ${user.userId}`);
    if (refreshToken === storedToken) {
      // recreate new access token
      const newToken = jwt.sign(
        { userId: user.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        },
      );
      res.cookie("accessToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.json({ message: "Token recreated successfully" });
    } else {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  } catch (error) {
    console.log("Error in recreateToken controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// To get user profile
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
