import { render } from '@testing-library/react'
import Login from '../../src/pages/auth/login'

const build = () => {
  const { container } = render(<Login />)

  return { container }
}

describe('Login module', () => {
  it('renders view', () => {
    build();
  })
})
