module.exports = (sequelize, DataTypes) => {
   const CartItem = sequelize.define("CartItem", {
      quantity: {
         type: DataTypes.INTEGER,
      }

   }, {
      tableName: "cart_items",

   });

   CartItem.associate = models => {
      CartItem.belongsTo(models.User, { foreignKey: "user_id" });
      CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
   };

   return CartItem;
}