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

type GetDesignSystem = (designId: string, token: string) => Promise<DesignSystem>;

export const getDesignSystem: GetDesignSystem = async (designId, token) => {
  const url = `${API_URL}/design-system/${designId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { headers });
  const { data } = await response.json();
  return data;
};

type CreateDesignSystem = (
  designSystem: {
    name: string;
    userId: string;
    fontsId: string;
    paletteId: string;
    spacingsId: string;
  },
  token: string
) => Promise<DesignSystem>;

export const createDesignSystem: CreateDesignSystem = async (designSystem, token) => {
  const url = `${API_URL}/design-system/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(designSystem),
  });

  const data = await response.json();
  return data;
};
