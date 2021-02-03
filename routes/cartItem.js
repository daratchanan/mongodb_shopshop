const router = require("express").Router();
const passport = require("passport");
const cartItemController = require('../controllers/cartItem');

const auth = passport.authenticate("jwt-auth", {session: false})

router.get('/', auth, cartItemController.getAllCartItem);
router.get('/:id', auth, cartItemController.getCartItemById);
router.post('/', auth, cartItemController.createCartItem);
router.put('/:id', auth,cartItemController.updateCartItem);
router.delete('/:id',auth, cartItemController.deleteCartItem);

module.exports = router;
