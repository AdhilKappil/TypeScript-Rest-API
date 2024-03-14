import express from 'express'
import { UserController } from '../controller/userController'

const userController = new UserController()

const router = express.Router()


router.post('/register',userController.registerUser)

router.post('/login',userController.login)

router.post('/logout',userController.logoutUser)


export default router