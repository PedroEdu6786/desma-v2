import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'
import {
  fireEvent,
  queryByPlaceholderText,
  queryByText,
  render,
} from '@testing-library/react'

import Register from '../../src/pages/auth/register'
import { authService } from '../../src/services/auth/auth'

jest.mock('axios')

type MockLogin = () => {
  container: HTMLElement
  nameInput: () => Element
  emailInput: () => Element
  passwordInput: () => Element
  confirmPasswordInput: () => Element
  submit: () => Element
}

const build: MockLogin = () => {
  const { container } = render(
    <ChakraProvider>
      <Register />
    </ChakraProvider>
  )

  return {
    container,
    nameInput: () => queryByPlaceholderText(container, 'name') || new Element(),
    emailInput: () =>
      queryByPlaceholderText(container, 'email') || new Element(),
    passwordInput: () =>
      queryByPlaceholderText(container, 'password') || new Element(),
    confirmPasswordInput: () =>
      queryByPlaceholderText(container, /confirm password/i) || new Element(),
    submit: () => queryByText(container, 'Register') || new Element(),
  }
}

describe('Register module', () => {
  it('renders view', () => {
    expect(build()).toBeDefined()
  })

  it('should register a user', async () => {
    const mockLoginRes = { data: { user: 'test' } }
    ;(axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes)

    const userData = { email: 'test@example.com', password: 'test' }
    const data = await authService().login(userData)
    expect(data).toBeDefined()
    expect(data).toEqual(mockLoginRes.data)
  })

  it('should register a user from view', () => {
    const mockLoginRes = { data: { user: 'test' } }
    ;(axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes)
    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submit,
    } = build()
    const userData = { email: 'test@example.com', password: 'test' }

    fireEvent.change(nameInput(), { target: { value: userData.email } })
    fireEvent.change(emailInput(), { target: { value: userData.email } })
    fireEvent.change(passwordInput(), { target: { value: userData.password } })
    fireEvent.change(confirmPasswordInput(), {
      target: { value: userData.password },
    })
    fireEvent.click(submit())
    expect(axios.post).toBeCalled()
  })
})
