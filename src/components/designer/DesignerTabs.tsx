import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

const DesignerTabs = () => {
  return (
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
};

export { DesignerTabs };
