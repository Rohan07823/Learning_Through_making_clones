
const express = require("express");
const authRouter = express.Router();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.Controller");
const {identifyUser} = require('../middlewares/auth.middleware.js')

const userModel = require("../models/user.model");

authRouter.post("/register", authController.registerController);

authRouter.post("/login", authController.loginController);

authRouter.get("/get-me",identifyUser,authController.getMeController);

module.exports = authRouter;
