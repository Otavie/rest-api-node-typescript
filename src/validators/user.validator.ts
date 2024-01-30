import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

export const validateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userPayload = req.body
    
    try {
        await userValidator.validateAsync(userPayload)
        next()
    } catch (error) {
        console.log(error)
        return res.status(406).send(error.detail[0].message)
    }
}


const userValidator = Joi.object({
    username: Joi.string()
        .min(5)
        .max(255)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'org'] }
        })
        .required()
})