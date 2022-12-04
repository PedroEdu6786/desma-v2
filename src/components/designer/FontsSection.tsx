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
import NumberInput from '../molecules/NumberInput';
import Select from '../molecules/Select';
import Table from '../molecules/Table';

export type FontsSectionProps = {};

const BASE_SIZE = 18;
const HEADINGS = ['space', 'pixels', 'example'];
const ROWS = [
  {
    space: '1',
    pixels: '1',
    text: <Text>test</Text>,
  },
  {
    space: '1',
    pixels: '1',
    text: <Text>test</Text>,
  },
  {
    space: '1',
    pixels: '1',
    text: <Text>test</Text>,
  },
];

export enum EScaleFactor {
  MINOR_SECOND = 'Minor Second',
  MAJOR_SECOND = 'Major Second',
  MINOR_THIRD = 'Minor Third',
  MAJOR_THIRD = 'Major Third',
  GOLDEN_RATIO = 'Golden Ratio',
}

export const SCALE_OPTIONS: EScaleFactor[] = [
  EScaleFactor.GOLDEN_RATIO,
  EScaleFactor.MAJOR_SECOND,
  EScaleFactor.MINOR_SECOND,
  EScaleFactor.MINOR_THIRD,
  EScaleFactor.MAJOR_THIRD,
];
const FontsSection: React.FC<FontsSectionProps> = () => {
  const [scaleFactor, setScaleFactor] = useState<number>(BASE_SIZE);

  return (
    <Grid templateRows="25% 75%" templateColumns="repeat(4, 1fr)" gap={5}>
      <GridItem colSpan={2} rowSpan={1}>
        <Stack direction="row" alignItems="center">
          <FormControl>
            <FormLabel>Heading Font</FormLabel>
            <Input type="text" placeholder="Lobster" />
            <FormHelperText>Input font from google fonts</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Paragraph Font</FormLabel>
            <Input type="text" placeholder="Inter" />
            <FormHelperText>Input font from google fonts</FormHelperText>
          </FormControl>
          <Button colorScheme="blue" w="100%" maxW="150px">
            Submit Fonts
          </Button>
        </Stack>
      </GridItem>
      {/*  */}
      <GridItem colSpan={2} rowSpan={1}>
        <Stack direction="row" alignItems="center">
          <FormControl>
            <FormLabel>Base size</FormLabel>
            <NumberInput allowMouseWheel defaultValue={BASE_SIZE} min={10} max={24} />
          </FormControl>
          <FormControl>
            <FormLabel>Scale factor</FormLabel>
            <Select options={SCALE_OPTIONS} />
          </FormControl>
        </Stack>
      </GridItem>
      {/*  */}
      <GridItem colSpan={2} rowSpan={1}>
        <Stack>
          <Text fontStyle="italic">Headings</Text>
          <Heading>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</Heading>
          <Heading>1234567890.,:;?!</Heading>
        </Stack>
        <Stack>
          <Text fontStyle="italic">Paragraphs</Text>
          <Text fontSize="xx-large" lineHeight="2.5rem">
            AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
          </Text>
          <Text fontSize="xx-large" lineHeight="2.5rem">
            1234567890.,:;?!
          </Text>
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
