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
import { useState } from 'react';
import useGoogleFont from '../../hooks/useGoogleFont';
import useScaleRatio, { EScaleFactor } from '../../hooks/useScaleRatio';
import NumberInput from '../molecules/NumberInput';
import Select from '../molecules/Select';
import Table from '../molecules/Table';

export type FontsSectionProps = {};

const BASE_SIZE = 18;
const HEADINGS = ['space', 'pixels', 'example'];

export const SCALE_OPTIONS: EScaleFactor[] = [
  EScaleFactor.GOLDEN_RATIO,
  EScaleFactor.MAJOR_SECOND,
  EScaleFactor.MINOR_SECOND,
  EScaleFactor.MINOR_THIRD,
  EScaleFactor.MAJOR_THIRD,
];

const SAMPLE_TEXT = 'Lorem ipsum dolor sit amet';
const FontsSection: React.FC<FontsSectionProps> = () => {
  const [scaleFactor, setScaleFactor] = useState<EScaleFactor>(EScaleFactor.GOLDEN_RATIO);
  const [baseSize, setBaseSize] = useState<number>(BASE_SIZE);
  const { handleFontRatio } = useScaleRatio();
  const [heading, setHeading, submitHeading] = useGoogleFont();
  const [paragraphs, setParagraphs, submitParagraphs] = useGoogleFont();

  const ROWS = handleFontRatio(scaleFactor, baseSize, SAMPLE_TEXT);

  const handleFonts = () => {
    submitHeading();
    submitParagraphs();
  };

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
              defaultValue={BASE_SIZE}
              min={10}
              max={24}
              value={baseSize}
              onChange={(e) => setBaseSize(Number(e))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Scale factor</FormLabel>
            <Select
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
        <Table headings={HEADINGS} rows={ROWS} />
      </GridItem>
    </Grid>
  );
};

export { FontsSection };
