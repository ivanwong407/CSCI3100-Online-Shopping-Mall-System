const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const Confirmation = require("../models/confirmation_model");

const { get_logger } = require("../utils/logger.js");
const { transporter } = require("../utils/transporter.js");

// Get Logger
const logger = get_logger();

// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.error("/api/user/register: Please add email and password");
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    logger.error("/api/user/register: User already exists");
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Confirmation String for email verification
  const confirmationString = await bcrypt.hash(`${Math.random() * 100 + 54}`, salt);

  const confirmationLink = `http://localhost:3001/api/user/verify/?id=${confirmationString}`;

  const confirmation = await Confirmation.create({
    email,
    confirmationString,
  });

  if (!confirmation) {
    logger.error("/api/user/register: Could not create confirmation link for the user");
    res.status(400);
    throw new Error("Could not create confirmation link for the user");
  }

  const mailOptions = {
    from: process.env.TRANSPORTER_EMAIL,
    to: email,
    subject: "Email Confirmation",
    text: `Please confirm the email by clicking on this link: ${confirmationLink}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(`/api/user/register: ${error}`);
      res.status(400);
      throw new Error(error);
    } else {
      logger.info(`/api/user/register: Email Verification link has been sent: ${info.response} `);
    }
  });

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    isAdmin: false,
    isVerified: false,
  });

  if (user) {
    logger.info("/api/user/register: Successful unverified user registration");
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    logger.error("/api/user/register: Invalid user data");
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.isVerified !== true) {
      // check email verification should only be done for correct credentials
      logger.error("/api/user/login: User is not verified");
      res.status(400);
      throw new Error("User is not verified");
    }
    logger.info("/api/user/login: Successful user login");
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    logger.error("/api/user/login: Invalid credentials");
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/user/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  logger.info("/api/user/me: Successful user info retrieval");
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Email Confirmation
// @route   GET /api/user/verify
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    if (!id) {
      logger.error("/api/user/verify: Please add verificication ID");
      res.status(400);
      throw new Error("Please add verificication ID");
    }
  
    const confirmation = await Confirmation.findOne({ confirmationString: id });
  
    if (!confirmation) {
      logger.error("/api/user/verify: User with the given verification link does not exist");
      res.status(400);
      throw new Error("User with the given verification link does not exist");
    }
  
    const user = await User.findOneAndUpdate({ email: confirmation.email }, { isVerified: true }, { new: true });
  
    if (user) {
      logger.info("/api/user/verify: Successful user verification");
      res.status(200).json(user);
    } else {
      logger.error("/api/user/verify: Invalid user data");
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

module.exports = {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
};