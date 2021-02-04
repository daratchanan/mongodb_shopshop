const router = require("express").Router();
const productController = require('../controllers/product');
const { upload } = require("../middleware/upload");
const passport = require("passport");

const auth = passport.authenticate("jwt-auth", {session: false})

router.get('/top', productController.getTopProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/productlist', auth, productController.getProducts);//admin

router.post('/createProductType', productController.createdProductTypes);
router.get('/allProductType', productController.getAllProductTypes);
// router.get('/allProductType', productController.getAllProductTypes);
// router.get('/allProductType_id/:id', productController.getProductByType);

router.post('/', upload.single("image"), productController.createProduct);
// router.post('/', productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
