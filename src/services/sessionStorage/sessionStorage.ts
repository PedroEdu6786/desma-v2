import axios from 'axios';
import { IUserStorage, SessionStorageService } from './interfaces';

export const sessionStorageService: SessionStorageService = () => {
  return {
    setUserData: (userData: IUserStorage) => userStoreData(userData),
    deleteSession: () => deleteUserSession(),
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

const deleteUserSession = async () => {
  const storageUrl = '/api/logout';
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(storageUrl, { headers });
    const { data } = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
