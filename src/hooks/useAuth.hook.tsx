import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { authService } from '../services/auth';
import { ILoginData, IRegisterData } from '../services/auth/interfaces';
import { sessionStorageService } from '../services/sessionStorage/sessionStorage';
import { userAuth } from '../useCases/auth';
import { sessionStorage } from '../useCases/auth/sessionStorage';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authHandler = userAuth(authService);
  const userStorage = sessionStorage(sessionStorageService);

  const loginUser = async (authData: ILoginData) => {
    setLoading(true);
    try {
      const { token, ...userData } = await authHandler().login(authData);
      await userStorage().setUserData({ token, userData });
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (authData: IRegisterData) => {
    setLoading(true);
    try {
      const { token, ...userData } = await authHandler().register(authData);
      await userStorage().setUserData({ token, userData });
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await userStorage().deleteSession();
      router.push('/auth/login');
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, registerUser, logoutUser, loading };
};

export default useAuth;
