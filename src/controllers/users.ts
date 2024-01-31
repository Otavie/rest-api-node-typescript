import { UserModel } from '../model/users'

export const getUsers = () => UserModel.find()

export const getUserByEmail = (email: string) => UserModel.findOne({ email }).select('+authentication.salt +authentication.password');

export const getUserBySessionToken = (sessionToken: string) => {
    UserModel.findOne({
        'authentication.sessionToken': sessionToken
    })
}

export const getUserById = (id: string) => UserModel.findById(id) 

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })

export const updateUserById = (id: string, values: Record<string, any>) => {
    UserModel.findByIdAndUpdate(id, values)
}