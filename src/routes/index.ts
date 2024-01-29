const express = require('express')
import { Router } from "express"
import authentication from "./authentication"

const router = express.Router()

export default(): Router => {
    authentication(router)
    return router
}