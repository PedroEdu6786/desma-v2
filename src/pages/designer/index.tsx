import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
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

const onSubmitDesignSystem = async (
  designSystem: ReturnType<typeof useDesignSystem>,
  name: string
) => {
  const url = '/api/createNewDesign';
  const headers = {
    'Content-Type': 'application/json',
  };
  const [primaryColors, secondaryColors, textColors, backgroundColors, extraColors] =
    designSystem.colors.colorGroups.map(({ colors }) => colors);

  const response = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      name,
      palette: {
        primaryColors,
        secondaryColors,
        textColors,
        backgroundColors,
        extraColors,
      },
      spacing: {
        baseSize: designSystem.spacing.baseSize,
        scaleFactor: designSystem.spacing.scaleFactor,
      },
      fonts: {
        headingFontName: designSystem.fonts.heading,
        parragraphFontName: designSystem.fonts.paragraphs,
        baseSize: designSystem.fonts.baseSize,
        scaleFactor: designSystem.fonts.scaleFactor,
      },
    }),
  });

  const { data } = await response.json();
  return data;
};

const Designer: NextPage = () => {
  const [name, setName] = useState('Untitled Design');
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Untitled Design System"
            fontSize="xl"
          />
        </GridItem>

        <GridItem area="save" justifySelf="end">
          <Button
            colorScheme="blue"
            onClick={() => {
              onSubmitDesignSystem(designSystem, name);
            }}
          >
            Save Design
          </Button>
        </GridItem>

        <GridItem area="tabs">
          <DesignerTabs {...designSystem} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Designer;
