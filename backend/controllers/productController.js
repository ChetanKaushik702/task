const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrorHandler = require("../middlewares/catchAsyncError");

// Create product :- ADMIN
const createProduct = AsyncErrorHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

const getAdminProducts = AsyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

const getProductDetails = AsyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

const getAllProducts = AsyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductDetails,
  getAdminProducts,
};
