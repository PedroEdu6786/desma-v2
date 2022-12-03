import React from 'react';
import { authService } from '../services/auth';
import { ILoginData, IRegisterData } from '../services/auth/interfaces';
import { userAuth } from '../useCases/auth';

const useAuth = () => {
  const authHandler = userAuth(authService);

  const loginUser = async (userData: ILoginData) => {
    const data = await authHandler().login(userData);
  };

  const registerUser = async (userData: IRegisterData) => {
    const data = await authHandler().register(userData);
  };

  return { loginUser, registerUser };
};

export default useAuth;
