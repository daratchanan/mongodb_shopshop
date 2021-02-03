const passport = require("passport");
const orderController = require('../controllers/order');
const router = require("express").Router();

const auth = passport.authenticate("jwt-auth", { session: false });

router.get('/', auth, orderController.getAllOrder);
router.get('/:id', auth, orderController.getOrderById);
router.post('/', auth, orderController.createOrder);
router.put('/:id', auth, orderController.updateOrder);
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;

