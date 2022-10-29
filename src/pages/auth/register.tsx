import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth/useAuth.hook'
import { IRegisterData } from '../../services/auth/interfaces'

interface IRegisterForm {
  name?: string
  email?: string
  password?: string
}
const initialState: IRegisterData = {
  email: '',
  password: '',
  name: '',
}

const Register = () => {
  const [registerForm, setRegisterForm] = useState<IRegisterData>(initialState)
  const { registerUser } = useAuth()
  const toast = useToast()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue: IRegisterForm = {}
    updatedValue[event.target.name as keyof IRegisterForm] = event.target.value
    setRegisterForm({ ...registerForm, ...updatedValue })
  }

  const isValidSubmit = () => {
    return (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.name ||
      !registerForm.password
    )
  }

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (isValidSubmit()) {
      toast({
        title: 'Error!',
        description: 'Missing fields',
        status: 'error',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
      })
    } else {
      await registerUser(registerForm as IRegisterData)
    }
  }

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
            Register
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
  )
}

export default Register
