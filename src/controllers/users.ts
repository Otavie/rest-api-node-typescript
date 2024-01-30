import { UserModel } from '../model/users'

export const getUsers = () => UserModel.find()


// export const getUserByEmail = (email: string) => {
//     UserModel.findOne({ email }).select('authentication.salt +authentication.password')
// }

export const getUserByEmail = (email: string) => UserModel.findOne({ email }).select('+authentication.salt +authentication.password');




export const getUserBySessionToken = (sessionToken: string) => {
    UserModel.findOne({
        'authentication.sessionToken': sessionToken
    })
}

export const getUserById = (id: string) => UserModel.findById(id) 

export const createUser = (values: Record<string, any>) => {
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

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })

export const updateUserById = (id: string, values: Record<string, any>) => {
    UserModel.findByIdAndUpdate(id, values)
}