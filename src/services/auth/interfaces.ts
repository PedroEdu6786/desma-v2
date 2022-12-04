import { IUserData } from '../../dtos/user';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginData {
  name: string;
}

export interface IAuthResponse extends IUserData {
  token: string;
}

export type AuthService = () => {
  login: (userData: ILoginData) => Promise<IAuthResponse>;
  register: (userData: IRegisterData) => Promise<IAuthResponse>;
};
