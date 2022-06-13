const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/auth')
const { getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct } = require('../controllers/productController')

router.route('/products').get(getProducts)
router.route('/admin/product/new').post(isAuthenticated, newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').put(isAuthenticated, updateProduct).delete(isAuthenticated, deleteProduct)
module.exports = router