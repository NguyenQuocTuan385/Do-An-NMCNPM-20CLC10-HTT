const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/auth')
const { getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct } = require('../controllers/productController')

router.route('/products').get(isAuthenticated, getProducts)
router.route('/admin/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct)
module.exports = router