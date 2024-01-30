const UserModel = require('../model/users')

const getUsers = () => UserModel.find()

const getUserByEmail = (email: string) => UserModel.findOne({ email })

const getUserBySessionToken = (sessionToken: string) => {
    UserModel.findOne({
        'authentication.sessionToken': sessionToken
    })
}

const getUserById = (id: string) => UserModel.findById(id) 

const createUser = (values: Record<string, any>) => {
    // Ensure that 'authentication' is a string before saving
    values.authentication = JSON.stringify(values.authentication)

    new UserModel(values)
        .save()
        .then((user: any) => user.toObject())
        .catch((error: Error) => {
            console.log(error)
            throw error
        })
}

const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })

const updateUserById = (id: string, values: Record<string, any>) => {
    UserModel.findByIdAndUpdate(id, values)
}

module.exports = {
    getUsers,
    getUserByEmail,
    getUserBySessionToken,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
}