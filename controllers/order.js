const Order = require("../models/Order");
const Product = require("../models/Product");
const OrderItem = require("../models/OrderItem");
const CartItem = require("../models/CartItem");

exports.getAllOrder = async (req, res) => {
   const order = await Order.findAll({});
   res.status(200).json({ order });
};

exports.getOrderById = async (req, res) => {
   try {
      const { id } = req.params;
      const order = await Order.findById(id);
      res.status(200).json({ order })
   } catch (error) {
      res.status(500).json({ message: "err.message" })
   }
};

exports.createOrder = async (req, res) => {
   try {
      const { total_price } = req.body;
      const order = await Order.create({
         date: new Date(),
         total_price,
         user_id: req.user.id
      });

      const id = req.user.id;
      const cartItems = await CartItem.findAll({
         where: {
            user_id: id
         },
         include: {
            model: Product
         }
      });

      const newOrderItem = cartItems.map(cartItem => ({
         quantity: cartItem.quantity,
         price: cartItem.Product.price,
         total: cartItem.quantity * cartItem.Product.price,
         order_id: order.id,
         product_id: cartItem.product_id
      }))

      await OrderItem.bulkCreate(newOrderItem);

      await CartItem.destroy({where: {
         user_id: id
      }})

      res.status(201).json({ cartItems });
   } catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
   }
};

exports.updateOrder = async (req, res) => {
   const { id } = req.params;
   const { date, total_price, delivery_date } = req.body;

   const order = await Order.findByIdAndUpdate(id);

   if (date) order.date = date;
   if (total_price) order.total_price = total_price;
   if (delivery_date) order.delivery_date = delivery_date;

   await order.save();

   res.status(200).json({ order });
};

exports.deleteOrder = async (req, res) => {
   try {
      const { id } = req.params;
      await Order.findByIdAndDelete({ where: { id } });
      res.status(204).json();
   } catch (error) {
      res.status(500).json({ message: err.message });
   }
};
