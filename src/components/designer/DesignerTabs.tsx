import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useDesignSystem } from '../../hooks/useDesignSystem';
import { ColorsSection } from './ColorsSection';
import { FontsSection } from './FontsSection';
import { Preview } from './Preview';
import { SpacingSection } from './SpacingSection';

type DesignerTabsProps = ReturnType<typeof useDesignSystem>;

// This component should not have state, it only groups the sections to avoid code repetition
const DesignerTabs: React.FC<DesignerTabsProps> = ({ colors, fonts, spacing }) => (
  <Tabs>
    <TabList>
      <Tab>Colors</Tab>
      <Tab>Fonts</Tab>
      <Tab>Spacing</Tab>
      <Tab>Preview</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <ColorsSection {...colors} />
      </TabPanel>
      <TabPanel>
        <FontsSection {...fonts} />
      </TabPanel>
      <TabPanel>
        <SpacingSection {...spacing} />
      </TabPanel>
      <TabPanel>
        <Preview />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export { DesignerTabs };
