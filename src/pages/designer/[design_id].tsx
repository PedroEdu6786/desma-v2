import { DeleteIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Input, Button, IconButton } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { ColorGroup } from '../../components/designer/ColorsSection';
import { DesignerTabs } from '../../components/designer/DesignerTabs';
import { Layout } from '../../components/Layout';
import { useDesignSystem } from '../../hooks/useDesignSystem';
import { serverSidePropsProtected } from '../../lib/protectedRoutes';
import { sessionOptions } from '../../lib/session';
import { getDesignSystem } from '../../services/designSystems/designSystems';
import { Font, getFonts } from '../../services/fonts/fonts';
import { getPalette } from '../../services/palettes/palettes';
import { getSpacings, Spacing } from '../../services/spacings/spacings';

type EditDesignProps = {
  name: string;
  colorGroups: ColorGroup[];
  paletteId: string;
  spacings: Spacing & { _id: string };
  fonts: Font & { _id: string };
};

export const getServerSideProps: GetServerSideProps<EditDesignProps> = withIronSessionSsr(
  async (context) => {
    const user = await serverSidePropsProtected(context);

    if ('redirect' in user) return user;
    const token = context.req.session.user?.token as string;
    const { paletteId, spacingsId, fontsId, name } = await getDesignSystem(
      context.query.design_id as string,
      token
    );

    const [
      { primaryColors, secondaryColors, textColors, backgroundColors, extraColors },
      spacings,
      fonts,
    ] = await Promise.all([
      getPalette(paletteId, token),
      getSpacings(spacingsId, token),
      getFonts(fontsId, token),
    ]);

    return {
      props: {
        name,
        paletteId,
        spacings,
        fonts,
        colorGroups: [
          { label: 'PrimaryColor', colors: primaryColors },
          { label: 'SecondaryColor', colors: secondaryColors },
          { label: 'TextColor', colors: textColors },
          { label: 'BackgroundColors', colors: backgroundColors },
          { label: 'ExtraColors', colors: extraColors },
        ],
      },
    };
  },
  sessionOptions
);

const EditDesign: React.FC<EditDesignProps> = ({
  name: initialName,
  paletteId,
  ...props
}) => {
  const designSystem = useDesignSystem(props);
  const [name, setName] = useState(initialName);

  return (
    <Layout>
      <Grid
        p="12"
        gap={6}
        gridTemplateColumns="1fr auto auto"
        gridTemplateAreas={`"name update delete"
                            "tabs tabs tabs"`}
      >
        <GridItem area="name" justifySelf="start">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Untitled Design System"
            fontSize="xl"
          />
        </GridItem>

        <GridItem area="update" justifySelf="end">
          <Button colorScheme="blue">Update Design</Button>
        </GridItem>

        <GridItem area="delete">
          <IconButton
            aria-label={`Delete Design System "${name}"`}
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        </GridItem>

        <GridItem area="tabs">
          <DesignerTabs {...designSystem} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default EditDesign;
