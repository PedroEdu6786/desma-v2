import { DeleteIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Input, Button, IconButton } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { DesignerTabs } from '../../components/designer/DesignerTabs';
import { Layout } from '../../components/Layout';
import { useDesignSystem } from '../../hooks/useDesignSystem';
import { serverSidePropsProtected } from '../../lib/protectedRoutes';
import { sessionOptions } from '../../lib/session';

type EditDesignProps = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<EditDesignProps> = withIronSessionSsr(
  async (context) => {
    const user = await serverSidePropsProtected(context);

    if ('redirect' in user) return user;
    return {
      props: {
        name: 'Mi primer proyecto',
      },
    };
  },
  sessionOptions
);

const EditDesign: React.FC<EditDesignProps> = ({ name: initialName }) => {
  const designSystem = useDesignSystem();
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
