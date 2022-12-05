import { useState } from 'react';
import { ColorGroup } from '../components/designer/ColorsSection';
import { Font } from '../services/fonts/fonts';
import { Spacing } from '../services/spacings/spacings';
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

export type UseDesignSystemProps = {
  colorGroups: ColorGroup[];
  spacings: Spacing;
  fonts: Font;
};

const defaultProps: UseDesignSystemProps = {
  colorGroups: INITIAL_COLOR_GROUPS,
  spacings: {
    baseSize: SPACING_DEFAULT_BASE_SIZE,
    scaleFactor: EScaleFactor.GOLDEN_RATIO,
  },
  fonts: {
    headingFontName: 'Inter',
    parragraphFontName: 'Inter',
    baseSize: FONTS_DEFAULT_BASE_SIZE,
    scaleFactor: EScaleFactor.GOLDEN_RATIO,
  },
};

const useDesignSystem = (props: UseDesignSystemProps = defaultProps) => {
  // Colors
  const [colorGroups, setColorGroups] = useState(props.colorGroups);
  const setColors = (groupIndex: number) => (colors: string[]) => {
    colorGroups[groupIndex].colors = colors;
    setColorGroups([...colorGroups]);
  };

  // Fonts
  const [fontsScaleFactor, setFontsScaleFactor] = useState<EScaleFactor>(
    props.fonts.scaleFactor
  );
  const [fontsBaseSize, setFontsBaseSize] = useState<number>(props.fonts.baseSize);
  const { handleFontRatio, handleSpacingScale } = useScaleRatio();
  const [heading, setHeading, submitHeading] = useGoogleFont(props.fonts.headingFontName);
  const [paragraphs, setParagraphs, submitParagraphs] = useGoogleFont(
    props.fonts.parragraphFontName
  );

  const fontRows = handleFontRatio(fontsScaleFactor, fontsBaseSize, SAMPLE_TEXT);

  const handleFonts = () => {
    submitHeading();
    submitParagraphs();
  };

  // Spacing
  const [spacingScaleFactor, setSpacingScaleFactor] = useState<EScaleFactor>(
    props.spacings.scaleFactor
  );
  const [spacingBaseSize, setSpacingBaseSize] = useState<number>(props.spacings.baseSize);
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
