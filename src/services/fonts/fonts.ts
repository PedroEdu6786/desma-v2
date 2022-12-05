import { EScaleFactor } from '../../hooks/useScaleRatio';
import { API_URL } from '../auth/constants';

export type Font = {
  headingFontName: string;
  parragraphFontName: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
};

export type RegisteredFont = Font & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type CreateNewFont = (font: Font, token: string) => Promise<RegisteredFont>;

export const createNewFont: CreateNewFont = async (font, token) => {
  const url = `${API_URL}/fonts/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(font),
  });

  const { data } = await response.json();
  return data;
};

export const editFont = async (font: Font, fontId: string, token: string) => {
  const url = `${API_URL}/fonts/${fontId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(font),
  });

  return response.json();
};

type GetFonts = (fontsId: string, token: string) => Promise<RegisteredFont>;

export const getFonts: GetFonts = async (fontsId, token) => {
  const url = `${API_URL}/fonts/${fontsId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { headers });
  const { data } = await response.json();
  return data;
};
