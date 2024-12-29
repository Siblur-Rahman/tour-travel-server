import { Router } from 'express'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/userValidation'

const authRouter = Router()

authRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.register
)
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthController.login
)
export default authRouter
