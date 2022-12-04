import React from 'react'
import { authService } from '../../services/auth'
import { ILoginData, IRegisterData } from '../../services/auth/interfaces'

const useAuth = () => {
  const loginUser = async (userData: ILoginData) => {
    const data = await authService().login(userData)
  }

  const registerUser = async (userData: IRegisterData) => {
    const data = await authService().register(userData)
  }

  return { loginUser, registerUser }
}

export default useAuth
