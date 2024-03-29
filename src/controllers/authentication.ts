import { Request, Response } from "express"
import { getUserByEmail, createUser } from "./users";
import { authentication, random } from "../helpers";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).send('No email or password provided!')
        }
        
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        
        if (!user) {
            return res.status(404).send('User not found')
        }

        // if (!user.authentication || !user.authentication.salt) {
        //     return res.status(403).send('Authentication failed!');
        // }

        const expectedHash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedHash) {
            return res.status(403).send('Password authentication failed!')
        }

        const salt = random()

        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        res.cookie('OTAVIE-COOKIE', user.authentication.sessionToken, { domain: 'localhost', path: '/' })
        return res.status(200).send({ message: 'Logged in successfully!', user })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send('Invalid request body!')
    }
}

export const register = async(req: Request, res: Response) => {
    try {
        const { email, authentication: { password }, username } = req.body

        if (!email || !password || !username) {
            return res.status(400).send('Email, password or username not provided!');
        }

        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return res.status(400).send('User already exist!')
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).send({ message: 'User added to the database', user });

    } catch (error) {
        console.log(error)
        return res.status(400).send('Invalid request body!')
    }
}