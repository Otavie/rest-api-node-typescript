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

// xxxxxxxxxxxxxxxxxxxxxxx
const getUsers = () => userModel.find()
const getUserByEmail = (email: string) => userModel.findOne({ email })
const getUserBySessionToken = (sessionToken: string) => {
    userModel.findOne({
        'authentication.sessionToken': sessionToken
    })
}
const getUserById = (id: string) => userModel.findById(id) 

const createUser = (values: Record<string, any>) => {
    // Ensure that 'authentication' is a string before saving
    values.authentication = JSON.stringify(values.authentication)

    new userModel(values)
        .save()
        .then((user: any) => user.toObject())
        .catch((error: Error) => {
            console.log(error)
            throw error
        })
}

const deleteUserById = (id: string) => userModel.findOneAndDelete({ _id: id })
const updateUserById = (id: string, values: Record<string, any>) => {
    userModel.findByIdAndUpdate(id, values)
}



module.exports = {
    userModel,
    getUsers,
    getUserByEmail,
    getUserBySessionToken,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
}