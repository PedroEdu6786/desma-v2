import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextPage } from 'next';
import { DesignerTabs } from '../../components/designer/DesignerTabs';
import { Layout } from '../../components/Layout';
import { useDesignSystem } from '../../hooks/useDesignSystem';
import { serverSidePropsProtected } from '../../lib/protectedRoutes';
import { sessionOptions } from '../../lib/session';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (context) => {
    const user = await serverSidePropsProtected(context);

    if ('redirect' in user) return user;
    return {
      props: {},
    };
  },
  sessionOptions
);

const Designer: NextPage = () => {
  const designSystem = useDesignSystem();

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
          <DesignerTabs {...designSystem} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Designer;
