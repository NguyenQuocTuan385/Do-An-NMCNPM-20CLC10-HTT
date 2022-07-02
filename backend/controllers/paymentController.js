const catchAsyncError = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')('sk_test_51LH2tIHdDJob937PF1YTS4pbvF7rdemauPGGbqhYUDT4ZTRUwQ0URyeQf6sfAfoUj9VOVED89cfK906yLOirnWQu000vzOF7Ep')

//Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' }
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

//Send stripe API KEY => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})