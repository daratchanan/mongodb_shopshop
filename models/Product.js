const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: String,
   price: Number,
   img: String,
   description: String,
   total_sale: Number
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

