import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import { connectDB } from './helpers'
import router from "./routes"

const PORT = process.env.PORT

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

connectDB()

app.use('/', router())