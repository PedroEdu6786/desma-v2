import { useState } from 'react';
import { ColorGroup } from '../components/designer/ColorsSection';
import useGoogleFont from './useGoogleFont';
import useScaleRatio, { EScaleFactor } from './useScaleRatio';

const INITIAL_COLOR_GROUPS: ColorGroup[] = [
  'PrimaryColor',
  'SecondaryColor',
  'TextColor',
  'BackgroundColors',
  'ExtraColors',
].map((label) => ({ label, colors: [] }));

export const FONTS_DEFAULT_BASE_SIZE = 18;
export const SPACING_DEFAULT_BASE_SIZE = 16;

const SAMPLE_TEXT = 'Lorem ipsum dolor sit amet';

const useDesignSystem = () => {
  // Colors
  const [colorGroups, setColorGroups] = useState(INITIAL_COLOR_GROUPS);
  const setColors = (groupIndex: number) => (colors: string[]) => {
    colorGroups[groupIndex].colors = colors;
    setColorGroups([...colorGroups]);
  };

  // Fonts
  const [fontsScaleFactor, setFontsScaleFactor] = useState<EScaleFactor>(
    EScaleFactor.GOLDEN_RATIO
  );
  const [fontsBaseSize, setFontsBaseSize] = useState<number>(FONTS_DEFAULT_BASE_SIZE);
  const { handleFontRatio, handleSpacingScale } = useScaleRatio();
  const [heading, setHeading, submitHeading] = useGoogleFont();
  const [paragraphs, setParagraphs, submitParagraphs] = useGoogleFont();

  const fontRows = handleFontRatio(fontsScaleFactor, fontsBaseSize, SAMPLE_TEXT);

  const handleFonts = () => {
    submitHeading();
    submitParagraphs();
  };

  // Spacing
  const [spacingScaleFactor, setSpacingScaleFactor] = useState<EScaleFactor>(
    EScaleFactor.GOLDEN_RATIO
  );
  const [spacingBaseSize, setSpacingBaseSize] = useState<number>(
    SPACING_DEFAULT_BASE_SIZE
  );
  const spacingRows = handleSpacingScale(spacingScaleFactor, spacingBaseSize);

  return {
    colors: {
      colorGroups,
      setColors,
    },
    fonts: {
      heading,
      setHeading,
      paragraphs,
      setParagraphs,
      handleFonts,
      baseSize: fontsBaseSize,
      setBaseSize: setFontsBaseSize,
      scaleFactor: fontsScaleFactor,
      setScaleFactor: setFontsScaleFactor,
      rows: fontRows,
    },
    spacing: {
      scaleFactor: spacingScaleFactor,
      setScaleFactor: setSpacingScaleFactor,
      baseSize: spacingBaseSize,
      setBaseSize: setSpacingBaseSize,
      rows: spacingRows,
    },
  };
};

export { useDesignSystem };
