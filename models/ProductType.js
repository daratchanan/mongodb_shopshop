const mongoose = require("mongoose");

const product_typesSchema = new mongoose.Schema({
   name: String
});

const ProductType = mongoose.model("ProductType", product_typesSchema);

module.exports = ProductType;


// ProductType.associate = models => {
//    ProductType.hasMany(models.Product, { foreignKey: "productType_id" });

// };

