import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import useScaleRatio, { EScaleFactor } from '../../hooks/useScaleRatio';
import NumberInput from '../molecules/NumberInput';
import Select from '../molecules/Select';
import Table from '../molecules/Table';
import { SCALE_OPTIONS } from './FontsSection';

export type SpacingSectionProps = {};

const HEADINGS = ['space', 'pixels', 'example'];

const BASE_SIZE = 16;
const SpacingSection: React.FC<SpacingSectionProps> = () => {
  const [scaleFactor, setScaleFactor] = useState<EScaleFactor>(EScaleFactor.GOLDEN_RATIO);
  const [baseSize, setBaseSize] = useState<number>(BASE_SIZE);
  const { handleSpacingScale } = useScaleRatio();

  const rows = handleSpacingScale(scaleFactor, baseSize);

  return (
    <Stack>
      <Stack direction="row" maxW="500px">
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
      <Table headings={HEADINGS} rows={rows} />
    </Stack>
  );
};

export { SpacingSection };
