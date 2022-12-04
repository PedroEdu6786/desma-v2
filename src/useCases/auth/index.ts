import { AuthService, ILoginData, IRegisterData } from '../../services/auth/interfaces';

export const userAuth = (authService: AuthService) => () => {
  return {
    login: (userData: ILoginData) => authService().login(userData),
    register: (userData: IRegisterData) => authService().register(userData),
  };
};
