const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        type: String,
        required: true,
        select: false
    },
    salt: {
        type: String,
        select: false
    },
    sessionToken: {
        type: String,
        select: false
    }
})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel