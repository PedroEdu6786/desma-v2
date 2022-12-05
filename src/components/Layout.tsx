import {
  Box,
  Divider,
  Flex,
  Link,
  Spacer,
  VStack,
  Heading,
  Button,
  Spinner,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth.hook';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logoutUser, loading } = useAuth();

  return (
    <VStack m={8} align="stretch" justify="center">
      <Flex alignItems="center">
        <Link href="/dashboard">
          <Heading as="h2" fontSize="2xl" className={styles.yellow_to_red_gradient}>
            Desma
          </Heading>
        </Link>
        <Spacer />
        <Button colorScheme="red" onClick={logoutUser}>
          {loading ? <Spinner /> : 'Logout'}
        </Button>
      </Flex>

      <Divider />

      {children}
    </VStack>
  );
};

export { Layout };
