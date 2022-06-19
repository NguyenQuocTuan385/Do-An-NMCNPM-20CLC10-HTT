const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

//Handle Uncaught exceptions.
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down server due to uncaught exception')
    process.exit(1)
})

//setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to DB
connectDatabase()
const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled Promise rejections
//Xu Ly khi ket noi toi MongoDB bi yeu
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down the server due to Unhandled Promise rejection')
    server.close(() => {
        process.exit(1)
    })
})