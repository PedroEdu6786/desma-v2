import { Button, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const Dashboard: NextPage = (props) => {
  return (
    <Layout>
      <Grid
        p="12"
        gridTemplateAreas={`"header button_add"
                            "counter button_add"
                            "main main"`}
      >
        <GridItem area="header">
          <Heading as="h2" size="2xl">
            My Design Systems
          </Heading>
        </GridItem>
        <GridItem area="counter">
          <Text color="gray.600">0 Design System Generated</Text>
        </GridItem>
        <GridItem area="button_add">
          <Link href="/designer">
            <Button>New Design System</Button>
          </Link>
        </GridItem>
        <GridItem area="main">
          <Link href="/designer">
            <Button variant="outline">Add Design System</Button>
          </Link>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
