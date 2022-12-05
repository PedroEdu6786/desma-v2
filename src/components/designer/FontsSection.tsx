import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FONTS_DEFAULT_BASE_SIZE, useDesignSystem } from '../../hooks/useDesignSystem';
import { EScaleFactor } from '../../hooks/useScaleRatio';
import NumberInput from '../molecules/NumberInput';
import Select from '../molecules/Select';
import Table from '../molecules/Table';

export type FontsSectionProps = ReturnType<typeof useDesignSystem>['fonts'];

const HEADINGS = ['space', 'pixels', 'example'];

export const SCALE_OPTIONS: EScaleFactor[] = [
  EScaleFactor.GOLDEN_RATIO,
  EScaleFactor.MAJOR_SECOND,
  EScaleFactor.MINOR_SECOND,
  EScaleFactor.MINOR_THIRD,
  EScaleFactor.MAJOR_THIRD,
];

const FontsSection: React.FC<FontsSectionProps> = ({
  heading,
  setHeading,
  paragraphs,
  setParagraphs,
  handleFonts,
  baseSize,
  setBaseSize,
  scaleFactor,
  setScaleFactor,
  rows,
}) => {
  return (
    <Grid templateRows="100px 75%" templateColumns="repeat(4, 1fr)" gap={5}>
      <GridItem colSpan={2} rowSpan={1}>
        <Stack direction="row" alignItems="center">
          <FormControl>
            <FormLabel>Heading Font</FormLabel>
            <Input
              type="text"
              placeholder="Lobster"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <FormHelperText>Input font from google fonts</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Paragraph Font</FormLabel>
            <Input
              type="text"
              placeholder="Inter"
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
            />
            <FormHelperText>Input font from google fonts</FormHelperText>
          </FormControl>
          <Button colorScheme="blue" w="100%" maxW="150px" onClick={handleFonts}>
            Submit Fonts
          </Button>
        </Stack>
      </GridItem>
      {/*  */}
      <GridItem colSpan={2} rowSpan={1}>
        <Stack direction="row" alignItems="center">
          <FormControl>
            <FormLabel>Base size</FormLabel>
            <NumberInput
              allowMouseWheel
              defaultValue={FONTS_DEFAULT_BASE_SIZE}
              min={10}
              max={24}
              value={baseSize}
              onChange={(e) => setBaseSize(Number(e))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Scale factor</FormLabel>
            <Select
              data-testid="scale"
              options={SCALE_OPTIONS}
              value={scaleFactor}
              onChange={(e) => setScaleFactor(e.target.value as EScaleFactor)}
            />
          </FormControl>
        </Stack>
      </GridItem>
      {/*  */}
      <GridItem colSpan={2} rowSpan={1}>
        <Stack>
          <Text fontStyle="italic">Headings</Text>
          <Heading fontFamily={heading}>
            AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
          </Heading>
          <Heading fontFamily={heading}>1234567890.,:;?!</Heading>
        </Stack>
        <Stack>
          <Text fontStyle="italic">Paragraphs</Text>
          <Box fontFamily={paragraphs}>
            <Text fontSize="xx-large" lineHeight="2.5rem">
              AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
            </Text>
            <Text fontSize="xx-large" lineHeight="2.5rem">
              1234567890.,:;?!
            </Text>
          </Box>
        </Stack>
      </GridItem>
      {/*  */}
      <GridItem colSpan={2}>
        <Table headings={HEADINGS} rows={rows} />
      </GridItem>
    </Grid>
  );
};

export { FontsSection };
