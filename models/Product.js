module.exports = (sequelize, DataTypes) => {
   const Product = sequelize.define("Product", {
      name: {
         type: DataTypes.STRING,
      },
      price: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      img: {
         type: DataTypes.STRING,
      },
      description: {
         type: DataTypes.STRING,
      },
      total_sale: {
         type: DataTypes.INTEGER,
      }
   }, {
      tableName: "products"
   });

   Product.associate = models => {
      Product.hasMany(models.OrderItem, { foreignKey: "product_id" });
      Product.belongsTo(models.ProductType, { foreignKey: "productType_id" });
      Product.hasMany(models.CartItem, { foreignKey: "product_id" });
   };

   return Product;
}