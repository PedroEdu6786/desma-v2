import axios from 'axios';
import { API_URL, LOGIN_URL, REGISTER_URL } from './constants';
import { AuthService, ILoginData, IRegisterData } from './interfaces';

export const authService: AuthService = () => {
  return {
    login: (userData: ILoginData) => userLogin(userData),
    register: (userData: IRegisterData) => userRegister(userData),
  };
};

const userLogin = async (userData: ILoginData) => {
  const loginUrl = `${API_URL}${LOGIN_URL}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(loginUrl, { ...userData }, { headers });
    const { data } = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

const userRegister = async (userData: ILoginData) => {
  const registerUrl = `${API_URL}${REGISTER_URL}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(registerUrl, { ...userData }, { headers });
    const { data } = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
