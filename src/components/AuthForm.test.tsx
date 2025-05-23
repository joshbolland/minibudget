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
});