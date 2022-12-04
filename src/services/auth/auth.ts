import axios from 'axios';
import { API_URL, LOGIN_URL, REGISTER_URL } from './constants';
import { AuthService, IAuthResponse, ILoginData, IRegisterData } from './interfaces';

export const authService: AuthService = () => {
  return {
    login: (userData: ILoginData) => userLogin(userData),
    register: (userData: IRegisterData) => userRegister(userData),
  };
};

const userLogin = async (userData: ILoginData): Promise<IAuthResponse> => {
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

const userRegister = async ({
  email,
  password,
  name,
}: IRegisterData): Promise<IAuthResponse> => {
  const registerUrl = `${API_URL}${REGISTER_URL}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const payload = { email, password, name };
    const response = await axios.post(registerUrl, payload, { headers });
    const { data } = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
