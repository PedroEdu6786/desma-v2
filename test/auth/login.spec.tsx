import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react';
import {
  act,
  fireEvent,
  queryByPlaceholderText,
  queryByText,
  render,
} from '@testing-library/react';

import Login from '../../src/pages/auth/login';
import { authService } from '../../src/services/auth/auth';

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
type MockLogin = () => {
  container: HTMLElement;
  emailInput: () => Element;
  passwordInput: () => Element;
  submit: () => Element;
};

const build: MockLogin = () => {
  const { container } = render(
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );

  return {
    container,
    emailInput: () => queryByPlaceholderText(container, 'email') || new Element(),
    passwordInput: () => queryByPlaceholderText(container, 'password') || new Element(),
    submit: () => queryByText(container, 'Login') || new Element(),
  };
};

describe('Login module', () => {
  it('renders view', () => {
    expect(build()).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user', async () => {
    const mockLoginRes = { data: { user: 'test' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes);

    const userData = { email: 'test@example.com', password: 'test' };
    const data = await authService().login(userData);
    expect(data).toBeDefined();
    expect(data).toEqual(mockLoginRes.data);
    expect(axios.post).toBeCalled();
  });

  it('should login a user from view', async () => {
    const mockLoginRes = { data: { user: 'test' } };
    (axios.post as jest.Mock).mockResolvedValue(mockLoginRes);
    const { emailInput, passwordInput, submit } = build();
    const userData = { email: 'test@example.com', password: 'test' };

    fireEvent.change(emailInput(), { target: { value: userData.email } });
    fireEvent.change(passwordInput(), { target: { value: userData.password } });
    await act(() => {
      fireEvent.click(submit());
    });
    expect(axios.post).toBeCalled();
  });

  it('should not login if missing fields', () => {
    const mockLoginRes = { data: { user: 'test' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes);
    const { emailInput, submit } = build();
    const userData = { email: 'test@example.com', password: 'test' };
    fireEvent.change(emailInput(), { target: { value: userData.email } });

    act(() => {
      fireEvent.click(submit());
    });

    expect(axios.post).not.toBeCalled();
  });
});
