import { Router } from "express"
import { register, login } from "../controllers/authentication"
import { validateUserMiddleware } from "../validators/user.validator"

export default (router: Router) => {
    router.post('/auth/register', validateUserMiddleware, register)
    router.post('/auth/login', login)
}