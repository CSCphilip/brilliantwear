const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  brand: String,
  category: String,
  type: String,
  price: Number,
  image_url: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
