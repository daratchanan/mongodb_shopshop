module.exports = (sequelize, DataTypes) => {
   const Order = sequelize.define("Order", {
      date: {
         type: DataTypes.DATE
      },
      total_price: {
         type: DataTypes.FLOAT
      },
      delivery_date: {
         type: DataTypes.DATE
      },

   }, {
      tableName: "orders",

   });

   Order.associate = models => {
      Order.belongsTo(models.User, { foreignKey: "user_id" });
      Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
   };

   return Order;
}