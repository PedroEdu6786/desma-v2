import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

// This component should not have state, it only groups the sections to avoid code repetition
const DesignerTabs = () => (
  <Tabs>
    <TabList>
      <Tab>Colors</Tab>
      <Tab>Fonts</Tab>
      <Tab>Spacing</Tab>
      <Tab>Preview</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
      <TabPanel>
        <p>four!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export { DesignerTabs };
