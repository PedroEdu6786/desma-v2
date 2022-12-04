import { Text } from '@chakra-ui/react';
import React from 'react';

export enum EScaleFactor {
  MINOR_SECOND = 'Minor Second',
  MAJOR_SECOND = 'Major Second',
  MINOR_THIRD = 'Minor Third',
  MAJOR_THIRD = 'Major Third',
  GOLDEN_RATIO = 'Golden Ratio',
}

export const SCALES = {
  [EScaleFactor.GOLDEN_RATIO]: 1.618,
  [EScaleFactor.MAJOR_SECOND]: 1.125,
  [EScaleFactor.MAJOR_THIRD]: 1.25,
  [EScaleFactor.MINOR_SECOND]: 1.067,
  [EScaleFactor.MINOR_THIRD]: 1.2,
};

const MAX_SIZE = 385;

const useScaleRatio = () => {
  const handleFontRatio = (scaleType: EScaleFactor, baseSize: number, text: string) => {
    const MAX_SIZE = 60;
    const scales = scaleFactor(scaleType, baseSize, MAX_SIZE);
    return scaleFontRatio(scales, baseSize, text);
  };

  const scaleFactor = (scaleType: EScaleFactor, baseSize: number, maxSize = MAX_SIZE) => {
    const scale = SCALES[scaleType];
    const factor = [];
    let remValue = Number((1 / scale).toFixed(3));
    let value = 0;
    let i = 0;
    while (value < maxSize) {
      factor.push(remValue);
      const scaleValue = factor[i] * scale;
      remValue = Number(scaleValue.toFixed(3));
      value = remToPx(remValue, baseSize);
      i++;
    }

    return factor;
  };

  const remToPx = (rem: number, baseSize: number): number => {
    const value = rem * baseSize;
    return Number(value.toFixed(2));
  };

  const scaleFontRatio = (scales: number[], baseSize: number, text: string) => {
    const fonts = [];

    for (let i = 0; i < scales.length; i++) {
      const pixels = remToPx(scales[i], baseSize);
      fonts.push({
        scale: `${scales[i]}rem`,
        pixels: `${pixels}px`,
        text: <Text fontSize={`${pixels}px`}>{text}</Text>,
      });
    }

    return fonts;
  };

  return { handleFontRatio };
};

export default useScaleRatio;
