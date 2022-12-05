import { Button, Grid, GridItem, Heading, HStack, Link, Text } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextPage } from 'next';
import { DesignSystemOverview } from '../components/DesignSystemOverview';
import { Layout } from '../components/Layout';
import { serverSidePropsProtected } from '../lib/protectedRoutes';
import { sessionOptions } from '../lib/session';
import { DesignSystem } from '../dtos/DesignSystem';

type DashboardProps = {
  designs: Pick<DesignSystem, '_id' | 'name'>[];
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = withIronSessionSsr(
  async (context) => {
    const user = await serverSidePropsProtected(context);

    if ('redirect' in user) return user;
    return {
      props: {
        designs: [
          { _id: '1', name: 'My first design system' },
          { _id: '2', name: 'Some personal project' },
          { _id: '3', name: 'Loatí Cabs' },
        ],
      },
    };
  },
  sessionOptions
);

const Dashboard: NextPage<DashboardProps> = ({ designs }) => {
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
          <Text color="gray.600">{designs.length} Design System Generated</Text>
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
        {designs.length > 0 ? (
          <GridItem area="main">
            <Grid
              templateColumns="repeat(auto-fit, 16rem)"
              gap="16"
              width="full"
              marginTop={4}
            >
              {designs.map(({ name, _id }) => (
                <DesignSystemOverview key={_id} name={name} _id={_id} />
              ))}
            </Grid>
          </GridItem>
        ) : (
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
        )}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
