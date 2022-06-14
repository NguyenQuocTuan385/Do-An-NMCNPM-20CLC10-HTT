const express = require('express');
const router = express.Router();

const { registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile} 
    = require('../controllers/authController');


const { isAuthenticated } = require('../middlewares/auth')


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticated, getUserProfile)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/me/update').put(isAuthenticated, updateProfile)



module.exports = router;