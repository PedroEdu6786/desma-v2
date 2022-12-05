import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { SPACING_DEFAULT_BASE_SIZE, useDesignSystem } from '../../hooks/useDesignSystem';
import { EScaleFactor } from '../../hooks/useScaleRatio';
import NumberInput from '../molecules/NumberInput';
import Select from '../molecules/Select';
import Table from '../molecules/Table';
import { SCALE_OPTIONS } from './FontsSection';

export type SpacingSectionProps = ReturnType<typeof useDesignSystem>['spacing'];

const HEADINGS = ['space', 'pixels', 'example'];

const SpacingSection: React.FC<SpacingSectionProps> = ({
  baseSize,
  setBaseSize,
  scaleFactor,
  setScaleFactor,
  rows,
}) => {
  return (
    <Stack>
      <Stack direction="row" maxW="500px">
        <FormControl>
          <FormLabel>Base size</FormLabel>
          <NumberInput
            allowMouseWheel
            defaultValue={SPACING_DEFAULT_BASE_SIZE}
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
      <Table headings={HEADINGS} rows={rows} />
    </Stack>
  );
};

export { SpacingSection };
