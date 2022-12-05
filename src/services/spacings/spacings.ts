import { EScaleFactor } from '../../hooks/useScaleRatio';
import { API_URL } from '../auth/constants';

export type Spacing = {
  baseSize: number;
  scaleFactor: EScaleFactor;
};

export type RegisteredSpacing = Spacing & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type CreateNewSpacing = (spacing: Spacing, token: string) => Promise<RegisteredSpacing>;

export const createNewSpacing: CreateNewSpacing = async (spacing, token) => {
  const url = `${API_URL}/spacings/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(spacing),
  });

  const { data } = await response.json();
  return data;
};
