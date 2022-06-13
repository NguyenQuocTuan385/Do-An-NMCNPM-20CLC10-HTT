const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Resgister a user
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '',
            url: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/272275516_1608903656118968_8706847657319824741_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tbaEBY6rEucAX9PQfdr&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT_JVtmbU6loyg3bNeK6c9SNPHsPXGDU2QGQ56wywKhu4A&oe=62AB5D25'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })

})

exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token
    })
})