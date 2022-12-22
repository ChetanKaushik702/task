const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrorHandler = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");

// adding a user
const addUser = AsyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// login user
const loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// logout user
const logoutUser = AsyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// get user details
const getUserDetails = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update password
const updatePassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password didn't match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// get All Users : ADMIN
const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// add to cart : USER
const addToCart = AsyncErrorHandler(async (req, res, next) => {
  const { productId, userId } = req.params;
  if (!userId || !productId) {
    return next(new ErrorHandler("Please login or select a product", 400));
  }
  const product = await Product.findOne({ _id: productId });
  const user = await User.findOne({ _id: userId });
  if (!user || !product) {
    return next(new ErrorHandler("User or product not found", 404));
  }
  let cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    cart = await Cart.create({
      userId: userId,
    });
  }
  cart.products.push(productId);
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Successfully added to cart!",
  });
});

// get cart items
const getCartItems = AsyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId: userId }).populate("products");
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }
  res.status(200).json({
    success: true,
    cart,
  });
});

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  getAllUsers,
  addToCart,
  getCartItems,
};
