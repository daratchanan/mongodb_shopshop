const Product = require("../models/Product");
const ProductType = require("../models/ProductType");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

exports.getProducts = async (req, res) => {
   // const products = await Product.find({});
   
   const products = await Product.find({}).populate({path: 'productType'});

   res.status(200).json({ products });
};

exports.createdProductTypes = async (req, res) => {

   try {
      const { name } = req.body;

      if (!name) return res.status(400).json({ message: "Name is require" });

      const targetType = await ProductType.findOne({ name });

      if (targetType) {
         res.status(400).send({ message: "name already used" });
      } else {
         const productType = await ProductType.create({
            name,
         });

         res.status(201).json({ productType });

      }

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

exports.getAllProductTypes = async (req, res) => {
   const productTypes = await ProductType.find({});
   res.status(200).json({ productTypes });
};


exports.getProductById = async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findById(id)
      res.status(200).json({ product });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};


exports.getProductByType = async (req, res) => {
   try {
      const { id } = req.params;
      const allProductType_id = await Product.findAll({ productType_id: id });
      res.status(200).json({ allProductType_id });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};


exports.getTopProduct = async (req, res) => {
   try {
      const { limit } = req.query;
      const products = await Product.findAll({
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

      // const product = await Product.create({
      //    name,
      //    price,
      //    description,
      //    productType_id,
      //    img
      // });
      // res.status(201).json({ product });

      cloudinary.uploader.upload(file.path, async (error, result) => {
         console.log(result);

         const product = await Product.create({
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

   const product = await Product.findByIdAndUpdate(id);

   if (name) product.name = name;
   if (price) product.price = price;
   if (description) product.description = description;

   await product.save();

   res.status(200).json({ product });
};


exports.deleteProduct = async (req, res) => {
   try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.status(204).json();
   } catch (error) {
      res.status(500).json({ message: err.message });
   }
};