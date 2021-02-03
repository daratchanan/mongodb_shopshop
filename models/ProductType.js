module.exports = (sequelize, DataTypes) => {
   const ProductType = sequelize.define("ProductType", {
      name: {
         type: DataTypes.STRING,
      },

   }, {
      tableName: "product_types"
   });

   ProductType.associate = models => {
      ProductType.hasMany(models.Product, { foreignKey: "productType_id" });
      
   };

   return ProductType;
}