const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: String,
   price: Number,
   img: String,
   description: String,
   total_sale: Number,
   productType: {
      type: mongoose.Schema.ObjectId,
      ref: 'ProductType'
   }
}, {
   toJSON: {virtuals:true},
   toObject: {virtuals:true}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

