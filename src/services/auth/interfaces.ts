export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginData {
  name: string;
}

export type AuthService = () => {
  login: (userData: ILoginData) => Promise<any>;
  register: (userData: IRegisterData) => Promise<any>;
};
