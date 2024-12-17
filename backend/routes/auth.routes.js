import express from 'express'
import { login, logout, signUp } from '../controllers/auth.controller.js'


const router = express.Router()

router.post("/signUp",signUp)


router.post("/login",login)

router.post("/logout",logout)


export default router