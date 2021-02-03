const db = require("../models");

exports.getAllCartItem = async (req, res) => {
  try{
  const cartItem = await db.CartItem.findAll({ 
    where : {
      user_id: req.user.id
    },
    include: {
      model: db.Product
    }
  });
  res.status(200).json({ cartItem });
}
catch(error){
  res.status(401).json({ message: "err.message" });
}
};

exports.getCartItemById = async (req, res) => {
 
  try {
    const { id } = req.params;
    const cartItem = await db.CartItem.findOne({ where:{id} })
    res.status(200).json({ cartItem });
  } catch (error) {
    res.status(500).json({ message: "err.message" });
  }
};

exports.createCartItem = async (req, res) => {
  try {
    const { quantity, product_id } = req.body;

    if (!quantity) return res.status(400).json({ message: "quantity is require" });
    if (!product_id) return res.status(400).json({ message: "product_id is require" });
    
    const cartItem = await db.CartItem.create({
      quantity,
      product_id,
      user_id: req.user.id
    });

    res.status(201).json({ cartItem });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity, product_id } = req.body;

  const cartItem = await db.CartItem.findOne( {where: {id}} );
  console.log('cartItem',cartItem)
  console.log('quantity',quantity)

  if (quantity) cartItem.quantity = quantity;
  //if (user_id) cartItem.user_id = user_id;
  if (product_id) cartItem.product_id = product_id;

  try {
    await cartItem.save();
  } catch (err) {
    console.error(err);
  };

  res.status(200).json({ cartItem });
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.CartItem.destroy({ where: {id} });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: err.message });
  }

};