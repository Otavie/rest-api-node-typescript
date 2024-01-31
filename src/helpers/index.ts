import crypto from 'crypto'
import mongoose from 'mongoose'

const SECRET_API_KEY = process.env.SECRET
const DB_URI = process.env.DB_URI

export const random = () => crypto.randomBytes(128).toString('base64')

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET_API_KEY).digest('hex')
}

export const connectDB = () => {
    mongoose.Promise = Promise
    mongoose.connect(DB_URI)

    mongoose.connection.on('connected', () => {
        console.log('Connected to DB successfully!')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from DB!')
    })

    mongoose.connection.on('error', (error) => {
        console.log('Error connecting to the DB', error)
    })
}