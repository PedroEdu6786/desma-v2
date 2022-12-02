import { Button, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const Dashboard: NextPage = (props) => {
  return (
    <Layout>
      <Grid
        p="12"
        gap={3}
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
        <GridItem area="button_add" alignSelf="center" justifySelf="end">
          <Link href="/designer">
            <Button
              px={8}
              bgGradient="linear(to-r, #aaffec -64%, #ff4ecd -20%, #0070f3 70.5%)"
              _hover={{
                opacity: 0.85,
              }}
              textColor="white"
            >
              New Design System
            </Button>
          </Link>
        </GridItem>
        <GridItem area="main" mt={24} justifySelf="center">
          <Link href="/designer">
            <Button
              px={8}
              bgGradient="linear(to-r, #aaffec -64%, #ff4ecd -20%, #0070f3 70.5%)"
              _hover={{
                opacity: 0.85,
              }}
              textColor="white"
            >
              Add Design System
            </Button>
          </Link>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
