import { API_URL } from '../auth/constants';

export type Palette = {
  primaryColors: string[];
  secondaryColors: string[];
  textColors: string[];
  backgroundColors: string[];
  extraColors: string[];
};

export type RegisteredPalette = Palette & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type CreateNewPalette = (palette: Palette, token: string) => Promise<RegisteredPalette>;

const toHexCode = (hexCode: string) => ({ hexCode });
const fromHexCode = ({ hexCode }: { hexCode: string }) => hexCode;

export const createNewPalette: CreateNewPalette = async (
  { primaryColors, secondaryColors, textColors, backgroundColors, extraColors },
  token
) => {
  const url = `${API_URL}/palette/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      primaryColors: primaryColors.map(toHexCode),
      secondaryColors: secondaryColors.map(toHexCode),
      textColors: textColors.map(toHexCode),
      backgroundColors: backgroundColors.map(toHexCode),
      extraColors: extraColors.map(toHexCode),
    }),
  });

  const data = await response.json();
  return data;
};

export const editPalette = async (
  { primaryColors, secondaryColors, textColors, backgroundColors, extraColors }: Palette,
  paletteId: string,
  token: string
) => {
  const url = `${API_URL}/palette/${paletteId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      primaryColors: primaryColors.map(toHexCode),
      secondaryColors: secondaryColors.map(toHexCode),
      textColors: textColors.map(toHexCode),
      backgroundColors: backgroundColors.map(toHexCode),
      extraColors: extraColors.map(toHexCode),
    }),
  });

  return response.json();
};

type GetPalette = (paletteId: string, token: string) => Promise<RegisteredPalette>;

export const getPalette: GetPalette = async (paletteId, token) => {
  const url = `${API_URL}/palette/${paletteId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { headers });
  const data = await response.json();
  return {
    ...data,
    primaryColors: data.primaryColors.map(fromHexCode),
    secondaryColors: data.secondaryColors.map(fromHexCode),
    textColors: data.textColors.map(fromHexCode),
    backgroundColors: data.backgroundColors.map(fromHexCode),
    extraColors: data.extraColors.map(fromHexCode),
  };
};
