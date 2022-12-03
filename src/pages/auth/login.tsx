import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth/useAuth.hook';
import { ILoginData } from '../../services/auth/interfaces';

interface ILoginForm {
  email?: string;
  password?: string;
}
const initialState: ILoginData = {
  email: '',
  password: '',
};

const Login = () => {
  const [loginForm, setLoginForm] = useState<ILoginData>(initialState);
  const { loginUser } = useAuth();
  const toast = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue: ILoginForm = {};
    updatedValue[event.target.name as keyof ILoginForm] = event.target.value;
    setLoginForm({ ...loginForm, ...updatedValue });
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: 'Error!',
        description: 'Missing fields',
        status: 'error',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
      });
    } else {
      await loginUser(loginForm as ILoginData);
    }
  };

  return (
    <Center h="100vh">
      <Stack spacing="2rem" textAlign="center">
        <Heading bgClip="text" bgGradient="linear(to-l, #7928CA, #FF0080)">
          Desma
        </Heading>
        <Stack>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="email"
              size="md"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              size="md"
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack>
          <Button colorScheme="blue" onClick={onSubmit}>
            Login
          </Button>
          <Text fontSize="xs">
            Need an account?{' '}
            <Link color="blue.500" href="/auth/register">
              Register
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Login;
