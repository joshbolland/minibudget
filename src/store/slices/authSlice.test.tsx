import { create } from 'zustand';
import { createAuthSlice, AuthState } from './authSlice';
import * as AmplifyAuth from 'aws-amplify/auth';
import type { AuthUser } from 'aws-amplify/auth';

jest.mock('aws-amplify/auth');

const createTestStore = () => create<AuthState>()((...a) => ({
  ...createAuthSlice(...a),
}));

let store: ReturnType<typeof createTestStore>;

describe('authSlice', () => {

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('has initial state', () => {
    const state = store.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.message).toBe('');
    expect(state.needsConfirmation).toBe(false);
    expect(state.fullName).toBe('');
  });

  it('logs in successfully', async () => {
    (AmplifyAuth.signIn as jest.Mock).mockResolvedValue({});
    (AmplifyAuth.getCurrentUser as jest.Mock).mockResolvedValue({ username: 'mockuser' });
    (AmplifyAuth.fetchUserAttributes as jest.Mock).mockResolvedValue({
      given_name: 'Josh',
      family_name: 'Bolland',
    });

    await store.getState().login('test@example.com', 'pass');

    const state = store.getState();
    expect(state.user).toEqual({ username: 'mockuser' });
    expect(state.fullName).toBe('Josh Bolland');
    expect(state.isAuthenticated).toBe(true);
    expect(state.message).toBe('Signed in successfully.');
  });

  it('handles login failure with error', async () => {
    (AmplifyAuth.signIn as jest.Mock).mockRejectedValue(new Error('fail'));

    await store.getState().login('email', 'pass');
    expect(store.getState().message).toBe('fail');
  });

  it('handles login failure with unknown error', async () => {
    (AmplifyAuth.signIn as jest.Mock).mockRejectedValue('oops');

    await store.getState().login('email', 'pass');
    expect(store.getState().message).toBe('Login failed');
  });

  it('signs up successfully', async () => {
    (AmplifyAuth.signUp as jest.Mock).mockResolvedValue({});

    await store.getState().signUp('e', 'p', 'g', 'f');
    const state = store.getState();
    expect(state.message).toMatch(/sign-up successful/i);
    expect(state.needsConfirmation).toBe(true);
  });

  it('handles signup error with message', async () => {
    (AmplifyAuth.signUp as jest.Mock).mockRejectedValue(new Error('nope'));
    await store.getState().signUp('e', 'p', 'g', 'f');
    expect(store.getState().message).toBe('nope');
  });

  it('handles signup unknown error', async () => {
    (AmplifyAuth.signUp as jest.Mock).mockRejectedValue('bad');
    await store.getState().signUp('e', 'p', 'g', 'f');
    expect(store.getState().message).toBe('Sign-up failed');
  });

  it('confirms signup successfully', async () => {
    (AmplifyAuth.confirmSignUp as jest.Mock).mockResolvedValue({});
    (AmplifyAuth.signIn as jest.Mock).mockResolvedValue({});
    (AmplifyAuth.getCurrentUser as jest.Mock).mockResolvedValue({ username: 'mockuser' });
    (AmplifyAuth.fetchUserAttributes as jest.Mock).mockResolvedValue({
      given_name: 'Test',
      family_name: 'User',
    });

    await store.getState().confirmSignUp('e', 'c', 'p');

    const state = store.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.needsConfirmation).toBe(false);
    expect(state.message).toBe('Account confirmed and logged in.');
  });

  it('handles confirmSignUp failure with error', async () => {
    (AmplifyAuth.confirmSignUp as jest.Mock).mockRejectedValue(new Error('err'));
    await store.getState().confirmSignUp('e', 'c', 'p');
    expect(store.getState().message).toBe('err');
  });

  it('handles confirmSignUp unknown error', async () => {
    (AmplifyAuth.confirmSignUp as jest.Mock).mockRejectedValue('fail');
    await store.getState().confirmSignUp('e', 'c', 'p');
    expect(store.getState().message).toBe('Confirmation failed');
  });

  it('resends code successfully', async () => {
    (AmplifyAuth.resendSignUpCode as jest.Mock).mockResolvedValue({});
    await store.getState().resendCode('email');
    expect(store.getState().message).toMatch(/resent/i);
  });

  it('handles resendCode error with message', async () => {
    (AmplifyAuth.resendSignUpCode as jest.Mock).mockRejectedValue(new Error('boom'));
    await store.getState().resendCode('email');
    expect(store.getState().message).toBe('boom');
  });

  it('handles resendCode unknown error', async () => {
    (AmplifyAuth.resendSignUpCode as jest.Mock).mockRejectedValue('fail');
    await store.getState().resendCode('email');
    expect(store.getState().message).toBe('Failed to resend code.');
  });

  it('fetches user successfully', async () => {
    (AmplifyAuth.getCurrentUser as jest.Mock).mockResolvedValue({ username: 'josh' });
    (AmplifyAuth.fetchUserAttributes as jest.Mock).mockResolvedValue({
      given_name: 'Josh',
      family_name: 'Bolland',
    });

    await store.getState().fetchUser();
    const state = store.getState();
    expect(state.user).toEqual({ username: 'josh' });
    expect(state.fullName).toBe('Josh Bolland');
    expect(state.isAuthenticated).toBe(true);
  });

  it('handles fetchUser error (Error instance)', async () => {
    (AmplifyAuth.getCurrentUser as jest.Mock).mockRejectedValue(new Error('auth fail'));
    await store.getState().fetchUser();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });

  it('handles fetchUser unknown error', async () => {
    (AmplifyAuth.getCurrentUser as jest.Mock).mockRejectedValue('not-an-error');
    await store.getState().fetchUser();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });

  it('logs out successfully', async () => {
    (AmplifyAuth.signOut as jest.Mock).mockResolvedValue(undefined);
    store.setState({ user: { username: 'mock', userId: 'mock-id' } as AuthUser, isAuthenticated: true });
    await store.getState().logout();
    const state = store.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('handles logout error', async () => {
    (AmplifyAuth.signOut as jest.Mock).mockRejectedValue(new Error('ignored'));
    store.setState({ user: { username: 'mock', userId: 'mock-id' } as AuthUser, isAuthenticated: true });
    await store.getState().logout();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });

  it('handles fetchUser unknown error (non-Error)', async () => {
    (AmplifyAuth.getCurrentUser as jest.Mock).mockRejectedValue(42);
    await store.getState().fetchUser();
    const state = store.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('handles login failure with non-Error value', async () => {
    (AmplifyAuth.signIn as jest.Mock).mockRejectedValue(42);
    await store.getState().login('email', 'pass');
    expect(store.getState().message).toBe('Login failed');
  });

  it('handles signup failure with non-Error value', async () => {
    (AmplifyAuth.signUp as jest.Mock).mockRejectedValue(42);
    await store.getState().signUp('e', 'p', 'g', 'f');
    expect(store.getState().message).toBe('Sign-up failed');
  });

  it('handles confirmSignUp failure with non-Error value', async () => {
    (AmplifyAuth.confirmSignUp as jest.Mock).mockRejectedValue(42);
    await store.getState().confirmSignUp('e', 'c', 'p');
    expect(store.getState().message).toBe('Confirmation failed');
  });

  it('handles resendCode failure with non-Error value', async () => {
    (AmplifyAuth.resendSignUpCode as jest.Mock).mockRejectedValue(42);
    await store.getState().resendCode('email');
    expect(store.getState().message).toBe('Failed to resend code.');
  });

  // Additional tests for specific failure cases

  it('handles fetchUserAttributes throwing non-Error in fetchUser', async () => {
    (AmplifyAuth.getCurrentUser as jest.Mock).mockResolvedValue({ username: 'user' });
    (AmplifyAuth.fetchUserAttributes as jest.Mock).mockRejectedValue(123);
    await store.getState().fetchUser();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });

  it('handles fetchUserAttributes throwing Error in login', async () => {
    (AmplifyAuth.signIn as jest.Mock).mockResolvedValue({});
    (AmplifyAuth.getCurrentUser as jest.Mock).mockResolvedValue({ username: 'user' });
    (AmplifyAuth.fetchUserAttributes as jest.Mock).mockRejectedValue(new Error('attr error'));
    await store.getState().login('email', 'pass');
    expect(store.getState().message).toBe('attr error');
  });

  it('handles signUp throwing generic object (non-Error)', async () => {
    (AmplifyAuth.signUp as jest.Mock).mockRejectedValue({ code: 'GenericError' });
    await store.getState().signUp('e', 'p', 'g', 'f');
    expect(store.getState().message).toBe('Sign-up failed');
  });

  it('handles fetchUserAttributes throwing Error in confirmSignUp after success', async () => {
    (AmplifyAuth.confirmSignUp as jest.Mock).mockResolvedValue({});
    (AmplifyAuth.signIn as jest.Mock).mockResolvedValue({});
    (AmplifyAuth.getCurrentUser as jest.Mock).mockResolvedValue({ username: 'user' });
    (AmplifyAuth.fetchUserAttributes as jest.Mock).mockRejectedValue(new Error('attr fail'));
    await store.getState().confirmSignUp('e', 'c', 'p');
    expect(store.getState().message).toBe('attr fail');
  });

  it('handles resendSignUpCode throwing generic object (non-Error)', async () => {
    (AmplifyAuth.resendSignUpCode as jest.Mock).mockRejectedValue({ code: 'GenericError' });
    await store.getState().resendCode('email');
    expect(store.getState().message).toBe('Failed to resend code.');
  });

  it('handles signOut throwing generic object (non-Error)', async () => {
    (AmplifyAuth.signOut as jest.Mock).mockRejectedValue({ code: 'GenericError' });
    store.setState({ user: { username: 'mock', userId: 'mock-id' } as AuthUser, isAuthenticated: true });
    await store.getState().logout();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });

  it('handles signOut throwing Error object', async () => {
    (AmplifyAuth.signOut as jest.Mock).mockRejectedValue(new Error('signout error'));
    store.setState({ user: { username: 'mock', userId: 'mock-id' } as AuthUser, isAuthenticated: true });
    await store.getState().logout();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });
});