import React, { useState } from 'react';
import { authService } from '../services/auth';
import { ILoginData, IRegisterData } from '../services/auth/interfaces';
import { userAuth } from '../useCases/auth';

const useAuth = () => {
  const authHandler = userAuth(authService);
  const [loading, setLoading] = useState(false);

  const loginUser = async (userData: ILoginData) => {
    setLoading(true);
    const data = await authHandler().login(userData);
    setLoading(false);
  };

  const registerUser = async (userData: IRegisterData) => {
    setLoading(true);
    const data = await authHandler().register(userData);
    setLoading(true);
  };

  return { loginUser, registerUser, loading };
};

export default useAuth;
