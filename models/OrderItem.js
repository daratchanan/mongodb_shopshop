module.exports = (sequelize, DataTypes) => {
   const OrderItem = sequelize.define("OrderItem", {
      quantity: {
         type: DataTypes.FLOAT
      },
      price: {
         type: DataTypes.FLOAT,
      },
      total: {
         type: DataTypes.FLOAT,
      }

   }, {
      tableName: "order_items",

   });

   OrderItem.associate = models => {
      OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
      OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });

   };

   return OrderItem;
}