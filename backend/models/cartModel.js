const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
