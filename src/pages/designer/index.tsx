import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { ColorGroup } from '../../components/designer/ColorsSection';
import { DesignerTabs } from '../../components/designer/DesignerTabs';
import { Layout } from '../../components/Layout';
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

const INITIAL_COLOR_GROUPS: ColorGroup[] = [
  'PrimaryColor',
  'SecondaryColor',
  'TextColor',
  'BackgroundColors',
  'ExtraColors',
].map((label) => ({ label, colors: [] }));

const Designer: NextPage = () => {
  const [colorGroups, setColorGroups] = useState(INITIAL_COLOR_GROUPS);
  const setColors = (groupIndex: number) => (colors: string[]) => {
    colorGroups[groupIndex].colors = colors;
    setColorGroups([...colorGroups]);
  };

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
          <DesignerTabs {...{ colorGroups, setColors }} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Designer;
