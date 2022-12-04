import axios from 'axios';
import { IUserStorage, SessionStorageService } from './interfaces';

export const sessionStorageService: SessionStorageService = () => {
  return {
    setUserData: (userData: IUserStorage) => userStoreData(userData),
  };
};

const userStoreData = async (userData: IUserStorage) => {
  const storageUrl = '/api/register';
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(storageUrl, { ...userData }, { headers });
    const { data } = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
