import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import compression from 'compression'
import cors from 'cors'
import router from "./routes"


const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

const app = express()

// app.use(express.json())

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

mongoose.connection.on('connected', () => {
    console.log(`Connected to the DB`)
})

mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected from the DB`)
})

mongoose.connection.on('error', (error: Error) => {
    console.log(`Error connecting to the DB`, error)
})

app.use('/', router())