import {
  IUserStorage,
  SessionStorageService,
} from '../../services/sessionStorage/interfaces';

export const sessionStorage = (sessionStorage: SessionStorageService) => () => {
  return {
    setUserData: (userData: IUserStorage) => sessionStorage().setUserData(userData),
    deleteSession: () => sessionStorage().deleteSession(),
  };
};
