import { IUserData } from '../../dtos/user';

export interface IUserStorage {
  token: string;
  userData: IUserData;
}

export type SessionStorageService = () => {
  setUserData: (userData: IUserStorage) => Promise<void>;
};
