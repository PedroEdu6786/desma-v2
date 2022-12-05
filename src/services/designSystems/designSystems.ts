import { DesignSystem } from '../../dtos/DesignSystem';
import { API_URL } from '../auth/constants';

type GetDesignSystems = (userId: string, token: string) => Promise<DesignSystem[]>;

export const getDesignSystems: GetDesignSystems = async (userId, token) => {
  const url = `${API_URL}/design-system/users/${userId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { headers });
  const { data } = await response.json();
  return data || [];
};
