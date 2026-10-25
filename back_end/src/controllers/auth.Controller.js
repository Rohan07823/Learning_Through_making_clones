const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  // {
  //     "username": "Rohan",
  //     "email": "rohan.test@example.com",
  //     "password": "TestPassword123",
  //     "bio": "unstoppable"
  // }
  try {
    const { username, email, password, bio, profileImage } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is missing",
      });
    }

    // Check if user already exists
    const isUserExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message:
          isUserExist.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    // Hash password
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    // Create user
    const user = await userModel.create({
      username,
      email,
      password: hash,
      bio,
      profileImage,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or username already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
async function loginController(req, res) {
  const { username, email, password } = req.body;

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  } else if (user.password !== hash) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "login successful",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
