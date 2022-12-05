import { DeleteIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Input, Button, IconButton } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { DesignerTabs } from '../../components/designer/DesignerTabs';
import { Layout } from '../../components/Layout';
import { serverSidePropsProtected } from '../../lib/protectedRoutes';

type EditDesignProps = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<EditDesignProps> = async (
  context
) => {
  const user = await serverSidePropsProtected(context);

  if ('redirect' in user) return user;
  return {
    props: {
      name: 'Mi primer proyecto',
    },
  };
};

const EditDesign: React.FC<EditDesignProps> = ({ name }) => {
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
          <Input defaultValue={name} placeholder="Untitled Design System" fontSize="xl" />
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
          <DesignerTabs />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default EditDesign;
