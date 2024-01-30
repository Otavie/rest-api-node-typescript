const crypto = require('crypto')

const SECRET_API_KEY = process.env.SECRET

export const random = () => crypto.randomBytes(128).toString('base64')

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET_API_KEY).digest('hex')
}