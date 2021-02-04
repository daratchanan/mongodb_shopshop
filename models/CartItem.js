const mongoose = require("mongoose");

const cartItemSchma = new mongoose.Schema({
   quantity: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchma);

module.exports = CartItem;



