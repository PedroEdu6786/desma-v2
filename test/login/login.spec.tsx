import axios from 'axios'
import { fireEvent, queryByRole, render } from '@testing-library/react'
import Login from '../../src/pages/auth/login'
import { authService } from '../../src/services/auth/auth'

jest.mock('axios')

type MockLogin = () => {
  container: HTMLElement
  emailInput: () => Element
  passwordInput: () => Element
  submit: () => Element
}

const build: MockLogin = () => {
  const { container } = render(<Login />)

  return {
    container,
    emailInput: () =>
      queryByRole(container, 'input', { name: 'email' }) || new Element(),
    passwordInput: () =>
      queryByRole(container, 'input', { name: 'password' }) || new Element(),
    submit: () =>
      queryByRole(container, 'button', { name: 'Sign in' }) || new Element(),
  }
}

describe('Login module', () => {
  it('renders view', () => {
    expect(build()).toBeDefined()
  })

  it('should login a user', async () => {
    const mockLoginRes = { data: { user: 'test' } }
    ;(axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes)

    const userData = { email: 'test@example.com', password: 'test' }
    const data = await authService().login(userData)
    expect(data).toBeDefined()
    expect(data).toEqual(mockLoginRes.data)
  })

  it('should login a user from view', () => {
    const { emailInput, passwordInput, submit } = build()
    const userData = { email: 'test@example.com', password: 'test' }

    fireEvent.change(emailInput(), { target: { value: userData.email } })
    fireEvent.change(passwordInput(), { target: { value: userData.password } })
    fireEvent.click(submit())
  })
})
