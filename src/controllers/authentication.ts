import { Request, Response } from "express"
const users = require('../database/users')
import { authentication, random } from "../helpers";

export const register = async(req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await users.getUserByEmail(email)

        if (existingUser) {
            // return res.sendStatus(400).send('User already exist!')
            return res.status(400).send('User already exist!')
        }

        const salt = random();

        const user = await users.createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}