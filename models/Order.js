const momgoose = require("mongoose");

const orderSchema = new momgoose.Schema({
   date: Date,
   total_price: Number,
   delivery_date: Date
});

const Order = momgoose.model("Order", orderSchema);

module.exports = Order;


