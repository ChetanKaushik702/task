const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter the product's name"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter the product's description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product's price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please enter the product's category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product's stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
