const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

//Forgot Password => api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Zonebook Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired'), 400)
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    //Setup new Password
    user.password = req.body.password

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user, 200, res)
})

//Resgister a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/3wd82ks0tc3jz1vzc7xt',
            url: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/272275516_1608903656118968_8706847657319824741_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tbaEBY6rEucAX9PQfdr&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT_JVtmbU6loyg3bNeK6c9SNPHsPXGDU2QGQ56wywKhu4A&oe=62AB5D25'
        }
    })

    sendToken(user, 200, res)

})

//LOGIN USER
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
})


//Get currently logged in user detail => /api/v1/me

exports.getUserProfile = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})


// Update/ Change password  => /ap1/v1/password/update

exports.updatePassword = catchAsyncErrors(async(req,res,next) =>{

    const user = await User.findById(req.user.id).select('+password');


    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassWord)
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect'));
    }
    user.password =  req.body.password;
    await user.save();
    sendToken(user,200,res)
})


//Update User Profile  => api/v1/me/update

exports.updateProfile = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar :TODO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false
    })


    res.status(200).json({
        success: true
    })
})

//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        exprires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})


//Admin routes


//Get all user  => .api/v1/admin/users

exports.allUsers = catchAsyncErrors(async(req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


//Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id : ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

//Update User Profile  => api/v1/admin/user/:id

exports.updateUser = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

   

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false
    })


    res.status(200).json({
        success: true
    })
})

//Delete user  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id : ${req.params.id}`))
    }

    //Remove avatar from cloudinary - TODO
    await user.remove();
    res.status(200).json({
        success:true,
        user
    })
})
