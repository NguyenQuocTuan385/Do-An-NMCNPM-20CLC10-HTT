const User = require('../models/user')
const jwt = require('jsonwebtoken')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//Check if user is authenticated or not
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (token === "j:null") {
        return next(new ErrorHandler('Login first to access this resource', 401))
    }

    const decoded = jwt.verify(token, "SDJFOW850FJSLDFJ4095809DFJG045FG")
    req.user = await User.findById(decoded.id)

    next()
})

//Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        //Neu role nao khong nam trong cai duoc include o req
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allow to access this resource`, 403))
        }
        next()
    }
} 
