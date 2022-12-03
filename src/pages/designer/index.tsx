import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { NextPage } from 'next';
import { DesignerTabs } from '../../components/designer/DesignerTabs';
import { Layout } from '../../components/Layout';

const Designer: NextPage = () => {
  return (
    <Layout>
      <Grid
        p="12"
        gap={6}
        gridTemplateAreas={`"name save"
                            "tabs tabs"`}
      >
        <GridItem area="name" justifySelf="start">
          <Input
            defaultValue="Untitled Design"
            placeholder="Untitled Design System"
            fontSize="xl"
          />
        </GridItem>

        <GridItem area="save" justifySelf="end">
          <Button colorScheme="blue">Save Design</Button>
        </GridItem>

        <GridItem area="tabs">
          <DesignerTabs />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Designer;
