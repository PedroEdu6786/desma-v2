import { Flex, Heading, VStack } from '@chakra-ui/react';
import { EditColors } from './EditColors';

export type ColorGroup = {
  label: string;
  colors: string[];
};

export type ColorsSectionProps = {
  colorGroups: ColorGroup[];
  setColors: (groupIndex: number) => (colors: string[]) => void;
};

const ColorsSection: React.FC<ColorsSectionProps> = ({ colorGroups, setColors }) => {
  return (
    <Flex alignContent="start" gap={8} wrap="wrap">
      {colorGroups.map(({ label, colors }, groupIndex) => (
        <VStack spacing={4} key={label} align="initial">
          <Heading as="h3" size="md">
            {label}
          </Heading>
          <EditColors colors={colors} setColors={setColors(groupIndex)} />
        </VStack>
      ))}
    </Flex>
  );
};

export { ColorsSection };
