import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react';
import {
  fireEvent,
  queryByPlaceholderText,
  queryByText,
  render,
} from '@testing-library/react';

import Register from '../../src/pages/auth/register';
import { authService } from '../../src/services/auth/auth';
import { act } from 'react-dom/test-utils';

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
  nameInput: () => Element;
  emailInput: () => Element;
  passwordInput: () => Element;
  confirmPasswordInput: () => Element;
  submit: () => Element;
};

const build: MockLogin = () => {
  const { container } = render(
    <ChakraProvider>
      <Register />
    </ChakraProvider>
  );

  return {
    container,
    nameInput: () => queryByPlaceholderText(container, 'name') || new Element(),
    emailInput: () => queryByPlaceholderText(container, 'email') || new Element(),
    passwordInput: () => queryByPlaceholderText(container, 'password') || new Element(),
    confirmPasswordInput: () =>
      queryByPlaceholderText(container, /confirm password/i) || new Element(),
    submit: () => queryByText(container, 'Register') || new Element(),
  };
};
const userResponse = { user: 'test' };

describe('Register module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders view', () => {
    expect(build()).toBeDefined();
  });

  it('should register a user', async () => {
    const mockLoginRes = { data: userResponse };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes);

    const userData = { email: 'test@example.com', password: 'test', name: 'test' };
    const data = await authService().register(userData);
    expect(data).toEqual(userResponse);
    expect(data).toEqual(mockLoginRes.data);
  });

  it('should register a user from view', async () => {
    const mockLoginRes = { data: userResponse };
    (axios.post as jest.Mock).mockResolvedValue(mockLoginRes);
    const { nameInput, emailInput, passwordInput, confirmPasswordInput, submit } =
      build();
    const userData = { email: 'test@example.com', password: 'test' };

    fireEvent.change(nameInput(), { target: { value: userData.email } });
    fireEvent.change(emailInput(), { target: { value: userData.email } });
    fireEvent.change(passwordInput(), { target: { value: userData.password } });
    fireEvent.change(confirmPasswordInput(), {
      target: { value: userData.password },
    });

    await act(() => {
      fireEvent.click(submit());
    });
    expect(axios.post).toBeCalled();
  });

  it('should not register if missing fields', () => {
    const mockLoginRes = { data: { user: 'test' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockLoginRes);
    const { nameInput, emailInput, submit } = build();
    const userData = { email: 'test@example.com', password: 'test' };

    fireEvent.change(nameInput(), { target: { value: userData.email } });
    fireEvent.change(emailInput(), { target: { value: userData.email } });

    fireEvent.click(submit());
    expect(axios.post).not.toBeCalled();
  });
});
