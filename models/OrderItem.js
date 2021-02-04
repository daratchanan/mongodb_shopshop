const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
   quantity: Number,
   price: Number,
   total: Number,
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;




// OrderItem.associate = models => {
//    OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
//    OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });

// };
