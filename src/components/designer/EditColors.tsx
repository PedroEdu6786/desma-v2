import { AddIcon } from '@chakra-ui/icons';
import { Flex, Grid, GridItem, GridItemProps } from '@chakra-ui/react';
import { hexToRgb } from '../../utils/colorConversion';
import { EditColor } from './EditColor';

type EditColorsProps = {
  colors: string[];
  setColors: (colors: string[]) => void;
};

const labelStyles: GridItemProps = {
  justifySelf: 'start',
  paddingLeft: 4,
};

const valueStyles: GridItemProps = {
  justifySelf: 'end',
  paddingRight: 4,
};

const EditColors: React.FC<EditColorsProps> = ({ colors, setColors }) => {
  const addColor = (newColor: string) => {
    setColors([...colors, newColor]);
  };
  const updateColor = (colorIndex: number) => (color: string) => {
    colors[colorIndex] = color;
    setColors([...colors]);
  };
  const removeColor = (colorIndex: number) => {
    colors.splice(colorIndex, 1);
    setColors([...colors]);
  };

  return (
    <Flex alignContent="start" gap={4} wrap="wrap">
      {colors.map((color, colorIndex) => (
        <EditColor
          key={color}
          initialColor={color}
          setColor={updateColor(colorIndex)}
          removeColor={() => removeColor(colorIndex)}
        >
          <Grid
            gap={2}
            pb={2}
            templateRows="1fr auto auto"
            templateColumns="1fr 1fr"
            width="full"
            height="full"
            fontSize="sm"
            fontWeight="normal"
          >
            <GridItem background={color} colSpan={2} />
            <GridItem {...labelStyles}>HEX</GridItem>
            <GridItem {...valueStyles}>{color}</GridItem>
            <GridItem {...labelStyles}>RGB</GridItem>
            <GridItem {...valueStyles}>{hexToRgb(color)}</GridItem>
          </Grid>
        </EditColor>
      ))}
      <EditColor setColor={addColor}>
        <AddIcon color="gray.400" />
      </EditColor>
    </Flex>
  );
};

export { EditColors };
