import { Box, Divider, Flex, Link, Spacer, VStack, Heading } from '@chakra-ui/react';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <VStack m={8} align="stretch" justify="center">
      <Flex>
        <Link href="/dashboard">
          <Heading as="h2" fontSize="2xl" className={styles.yellow_to_red_gradient}>
            Desma
          </Heading>
        </Link>
        <Spacer />
        <Box>Avatar</Box>
      </Flex>

      <Divider />

      {children}
    </VStack>
  );
};

export { Layout };
