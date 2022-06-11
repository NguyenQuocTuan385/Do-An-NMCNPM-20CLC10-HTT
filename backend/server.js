const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

//setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to DB
connectDatabase()
const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down the server due to Unhandled Promise rejection')
    server.close(() => {
        process.exit(1)
    })
})