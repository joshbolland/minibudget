import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '@/components/AuthForm';
import { useAppStore } from '@/store/useAppStore';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/store/useAppStore');

const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>;

const baseMockStore = {
  login: jest.fn(),
  signUp: jest.fn(),
  confirmSignUp: jest.fn(),
  resendCode: jest.fn(),
  logout: jest.fn(),
  message: '',
  loading: false,
  isAuthenticated: false,
  needsConfirmation: false,
};

describe('AuthForm', () => {
  beforeEach(() => {
    mockUseAppStore.mockReturnValue({ ...baseMockStore });
  });

  it('renders sign in form by default', () => {
    render(<AuthForm />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('toggles to sign up form', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText('No account? Sign up'));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('renders confirmation code section when needed', () => {
    mockUseAppStore.mockReturnValueOnce({ ...baseMockStore, needsConfirmation: true });
    render(<AuthForm />);
    expect(screen.getByPlaceholderText('Confirmation code')).toBeInTheDocument();
    expect(screen.getByText('Confirm Account')).toBeInTheDocument();
    expect(screen.getByText('Resend Confirmation Code')).toBeInTheDocument();
  });

  it('handles sign up form submission', async () => {
    const mockSignUp = jest.fn();
    mockUseAppStore.mockReturnValue({
      ...baseMockStore,
      signUp: mockSignUp,
    });

    render(<AuthForm />);
    fireEvent.click(screen.getByText('No account? Sign up'));

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Create Account'));
    expect(mockSignUp).toHaveBeenCalledWith('john@example.com', 'password123', 'John', 'Doe');
  });

  it('handles confirmation code submission', async () => {
    const mockConfirmSignUp = jest.fn();
    mockUseAppStore.mockReturnValue({
      ...baseMockStore,
      needsConfirmation: true,
      confirmSignUp: mockConfirmSignUp,
    });

    render(<AuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Confirmation code'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Confirm Account'));

    expect(mockConfirmSignUp).toHaveBeenCalledWith('', '123456', '');
  });

  it('resends confirmation code', async () => {
    const mockResendCode = jest.fn();
    mockUseAppStore.mockReturnValue({
      ...baseMockStore,
      needsConfirmation: true,
      resendCode: mockResendCode,
    });

    render(<AuthForm />);
    fireEvent.click(screen.getByText('Resend Confirmation Code'));

    expect(mockResendCode).toHaveBeenCalledWith('');
  });

  it('disables submit button when loading', () => {
    mockUseAppStore.mockReturnValue({
      ...baseMockStore,
      loading: true,
    });

    render(<AuthForm />);
    const button = screen.getByRole('button', { name: /log in/i });
    expect(button).toBeDisabled();
  });
});

it('shows message when present and handles logout', () => {
  const mockLogout = jest.fn();
  mockUseAppStore.mockReturnValue({
    ...baseMockStore,
    message: 'Test message',
    logout: mockLogout,
  });

  render(<AuthForm />);
  expect(screen.getByText('Test message')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Sign out'));
  expect(mockLogout).toHaveBeenCalled();
});