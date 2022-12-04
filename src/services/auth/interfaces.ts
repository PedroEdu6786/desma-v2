export interface ILoginData {
  email: string
  password: string
}

export interface IRegisterData {
  email: string
  password: string
  name: string
}

export type AuthService = () => {
  login: (userData: ILoginData) => Promise<any>
  register: (userData: IRegisterData) => Promise<any>
}
