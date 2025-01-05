import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILoginUser } from './auth.interface'
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const reasult = await User.create(payload)
  return reasult
}
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new Error('User not found!')
  }

  const userStatus = user?.userStatus
  if (userStatus === 'inactive') {
    throw new Error('User is not active!!!')
  }

  const isPasswordMatch = await bcript.compare(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatch) {
    throw new Error('Password is not Match!!!')
  }

  const token = jwt.sign({ email: user?.email, role: user?.role }, 'secret', {
    expiresIn: '1d',
  })

  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  }
  return { token, verifiedUser }
}

export const AuthService = {
  register,
  login,
}
