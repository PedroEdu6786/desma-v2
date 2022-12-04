import React, { useEffect, useState } from 'react';

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=';
const WEIGHT_QUERY = ':wght@400;700&display=swap';

const useGoogleFont = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  () => void
] => {
  const [font, setFont] = useState('');

  const submitFont = () => {
    const newFont = font.replace(/\s/g, '+');
    const fontLink = `${GOOGLE_FONTS_URL}${newFont}${WEIGHT_QUERY}`;
    const link = document.createElement('link');

    const links = document.getElementsByTagName('link');

    let fontExists = false;
    for (let item of Array.from(links)) {
      if (item.href === font) fontExists = true;
    }

    link.rel = 'stylesheet';

    if (!fontExists) {
      link.href = fontLink;
      document.head.appendChild(link);
    }
  };

  return [font, setFont, submitFont];
};

export default useGoogleFont;
