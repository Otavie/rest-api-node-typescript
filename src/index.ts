import mongoose from "mongoose"

require('dotenv').config()
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const router = require('./routes')

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

mongoose.Promise = Promise
mongoose.connect(DB_URI)
mongoose.connection.on('error', (error: Error) => {
    console.log(`Error connecting to the DB`, error)
})

app.use('/', router())