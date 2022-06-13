const express = require('express')
const app = express()
const errorMiddleWare = require('./middlewares/errors')
const products = require('./routes/product')
const auth = require('./routes/auth')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

//Import all routes
app.use('/api/v1', products)
app.use('/api/v1', auth)

//Middleware to handle error
app.use(errorMiddleWare)

module.exports = app