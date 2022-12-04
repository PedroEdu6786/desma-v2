import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  FormControl,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth.hook';
import { IRegisterData } from '../../services/auth/interfaces';
import useToast from '../../hooks/useToast.hook';

interface IRegisterForm {
  name?: string;
  email?: string;
  password?: string;
}
const initialState: IRegisterData = {
  email: '',
  password: '',
  name: '',
};

const Register = () => {
  const [registerForm, setRegisterForm] = useState<IRegisterData>(initialState);
  const router = useRouter();
  const { registerUser, loading } = useAuth();
  const { callFailToast, callSuccessToast } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue: IRegisterForm = {};
    updatedValue[event.target.name as keyof IRegisterForm] = event.target.value;
    setRegisterForm({ ...registerForm, ...updatedValue });
  };

  const isValidSubmit = () => {
    return (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.name ||
      !registerForm.password
    );
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (isValidSubmit()) {
      return callFailToast('Missing email or password');
    }

    try {
      await registerUser(registerForm);
      callSuccessToast('Account created successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      callFailToast('Could not register user');
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
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="name"
              size="md"
              onChange={handleInputChange}
            />
          </FormControl>
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
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              size="md"
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack>
          <Button colorScheme="blue" onClick={onSubmit} disabled={loading}>
            {loading ? <Spinner /> : 'Register'}
          </Button>
          <Text fontSize="xs">
            Already have an account?{' '}
            <Link color="blue.500" href="/auth/login">
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Register;
