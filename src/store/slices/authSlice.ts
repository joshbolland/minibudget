import { StateCreator } from 'zustand';
import { signIn, signOut, signUp, getCurrentUser, confirmSignUp as confirmSignUpAmplify, resendSignUpCode, fetchUserAttributes } from 'aws-amplify/auth';
import type { AuthUser } from 'aws-amplify/auth';

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    message: string;
    needsConfirmation: boolean;
    fullName: string;
    fetchUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, givenName: string, familyName: string) => Promise<void>;
    confirmSignUp: (email: string, code: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resendCode: (email: string) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    message: '',
    needsConfirmation: false,
    fullName: '',

    fetchUser: async () => {
        set({ loading: true });
        try {
            const user = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            const fullName = `${attributes.given_name ?? ''} ${attributes.family_name ?? ''}`.trim();
            set({ user, isAuthenticated: true, fullName, loading: false });
        } catch {
            set({ user: null, isAuthenticated: false, loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true, message: '' });
        try {
            await signIn({ username: email, password });
            const user = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            const fullName = `${attributes.given_name ?? ''} ${attributes.family_name ?? ''}`.trim();
            set({
                user,
                isAuthenticated: true,
                message: 'Signed in successfully.',
                loading: false,
                fullName,
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ message: err.message || 'Login failed', loading: false });
            } else {
                set({ message: 'Login failed', loading: false });
            }
        }
    },

    signUp: async (email, password, givenName, familyName) => {
        set({ loading: true, message: '' });
        try {
            await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email,
                        given_name: givenName,
                        family_name: familyName,
                    },
                },
            });
            set({ message: 'Sign-up successful. Please check your email.', needsConfirmation: true, loading: false });
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ message: err.message || 'Sign-up failed', loading: false });
            } else {
                set({ message: 'Sign-up failed', loading: false });
            }
        }
    },

    confirmSignUp: async (email, code, password) => {
        try {
            await confirmSignUpAmplify({ username: email, confirmationCode: code });
            await signIn({ username: email, password });
            const user = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            const fullName = `${attributes.given_name ?? ''} ${attributes.family_name ?? ''}`.trim();
            set({
                user,
                isAuthenticated: true,
                needsConfirmation: false,
                message: 'Account confirmed and logged in.',
                fullName,
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ message: err.message || 'Confirmation failed' });
            } else {
                set({ message: 'Confirmation failed' });
            }
        }
    },

    resendCode: async (email) => {
        try {
            await resendSignUpCode({ username: email });
            set({ message: 'Confirmation code resent. Please check your email.' });
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ message: err.message || 'Failed to resend code.' });
            } else {
                set({ message: 'Failed to resend code.' });
            }
        }
    },

    logout: async () => {
        try {
            await signOut();
        } finally {
            set({ user: null, isAuthenticated: false });
        }
    },
});
