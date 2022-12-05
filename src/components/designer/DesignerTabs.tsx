import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { ColorsSection, ColorsSectionProps } from './ColorsSection';
import { FontsSection, FontsSectionProps } from './FontsSection';
import { Preview, PreviewProps } from './Preview';
import { SpacingSection, SpacingSectionProps } from './SpacingSection';

type DesignerTabsProps = ColorsSectionProps &
  FontsSectionProps &
  SpacingSectionProps &
  PreviewProps;

// This component should not have state, it only groups the sections to avoid code repetition
const DesignerTabs: React.FC<DesignerTabsProps> = ({ setColors, colorGroups }) => (
  <Tabs>
    <TabList>
      <Tab>Colors</Tab>
      <Tab>Fonts</Tab>
      <Tab>Spacing</Tab>
      <Tab>Preview</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <ColorsSection {...{ setColors, colorGroups }} />
      </TabPanel>
      <TabPanel>
        <FontsSection />
      </TabPanel>
      <TabPanel>
        <SpacingSection />
      </TabPanel>
      <TabPanel>
        <Preview />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export { DesignerTabs };
