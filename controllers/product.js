const db = require("../models");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

exports.getProducts = async (req, res) => {
   const products = await db.Product.findAll({
      include: {
      model: db.ProductType
    }
   });
   
   res.status(200).json({ products });
};

exports.getAllProductTypes = async (req, res) => {
   const productTypes = await db.ProductType.findAll({});
   res.status(200).json({ productTypes });
};

exports.getProductById = async (req, res) => {
   try {
      const { id } = req.params;
      const product = await db.Product.findOne({ where: { id } })
      res.status(200).json({ product });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};


exports.getProductByType = async (req, res) => {
   try {
      const { id } = req.params;
      const allProductType_id = await db.Product.findAll({ where: { productType_id: id } })
      res.status(200).json({ allProductType_id });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};


exports.getTopProduct = async (req, res) => {
   try {
      const { limit } = req.query;
      const products = await db.Product.findAll({
         order: [
            ["total_sale", "DESC"],
         ],
         limit: Number(limit)
      });
      res.status(200).json({ products })
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
   }
}


exports.createProduct = async (req, res) => {
   try {
      const { name, price, description, productType_id } = req.body;
      const file = req.file;

      if (!name) return res.status(400).json({ message: "Name is require" });
      if (!price) return res.status(400).json({ message: "Price is require" });


      cloudinary.uploader.upload(file.path, async (error, result) => {
         console.log(result);

         const product = await db.Product.create({
            name,
            price,
            description,
            productType_id,
            img: result.secure_url
         });

         fs.unlinkSync(file.path);
         res.status(201).json({ product });
      });

   } catch (err) {
      res.status(500).json({ message: err.message });
   }

};


exports.updateProduct = async (req, res) => {
   const { id } = req.params;
   const { name, price, description } = req.body;

   const product = await db.Product.findOne({ where: { id } });

   if (name) product.name = name;
   if (price) product.price = price;
   if (description) product.description = description;

   await product.save();

   res.status(200).json({ product });
};


exports.deleteProduct = async (req, res) => {
   try {
      const { id } = req.params;
      await db.Product.destroy({ where: { id } });
      res.status(204).json();
   } catch (error) {
      res.status(500).json({ message: err.message });
   }

};