const express = require('express')
const router = express.Router()
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const { getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts } = require('../controllers/productController')

router.route('/products').get(getProducts)
router.route('/admin/products').get(getAdminProducts)
router.route('/admin/product/new').post(isAuthenticated, authorizeRoles('admin'), newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').put(isAuthenticated, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct)

router.route('/review').put(isAuthenticated, createProductReview)
router.route('/reviews').get(isAuthenticated, getProductReviews)
router.route('/reviews').delete(isAuthenticated, deleteReview)
module.exports = router