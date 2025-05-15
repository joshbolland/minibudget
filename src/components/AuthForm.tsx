'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAppStore';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [confirmationCode, setConfirmationCode] = useState('');

    const {
        login,
        signUp,
        confirmSignUp,
        resendCode,
        logout,
        message,
        loading,
        isAuthenticated,
        needsConfirmation,
    } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'signup') {
            setSignupPassword(password);
            await signUp(email, password, firstName.trim(), lastName.trim());
        } else {
            await login(email, password);
        }
    };

    const handleConfirm = async () => {
        await confirmSignUp(email, confirmationCode, signupPassword);
        setSignupPassword('');
    };

    const handleResendCode = async () => {
        await resendCode(email);
    };

    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-[#4f46e5] mb-2">minibudget</h1>
            <p className="text-center text-sm text-[#6b7280] mb-6">Take control of your money</p>

            <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow bg-[#f9fafb]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-[#4f46e5]">
                        {mode === 'signup' ? 'Sign Up' : 'Sign In'}
                    </h2>
                    {mode === 'signup' && (
                        <>
                            <label htmlFor="firstName" className="text-sm font-medium text-[#111827]">First Name</label>
                            <input
                                className="w-full p-2 border rounded text-[#111827]"
                                id='fi
                                '
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <label htmlFor="lastName" className="text-sm font-medium text-[#111827]">Last Name</label>
                            <input
                                className="w-full p-2 border rounded text-[#111827]"
                                id='lastName'
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <label htmlFor="email" className="text-sm font-medium text-[#111827]">Email</label>
                    <input
                        className="w-full p-2 border rounded text-[#111827]"
                        id='email'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="text-sm font-medium text-[#111827]">Password</label>
                    <input
                        className="w-full p-2 border rounded text-[#111827]"
                        id='password'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#4f46e5] text-white py-2 rounded hover:bg-[#4338ca] cursor-pointer"
                        disabled={loading}
                    >
                        {mode === 'signup' ? 'Create Account' : 'Log In'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                        className="text-sm text-[#f59e0b] hover:underline cursor-pointer"
                    >
                        {mode === 'signup'
                            ? 'Already have an account? Sign in'
                            : 'No account? Sign up'}
                    </button>
                    <button
                        type="button"
                        onClick={logout}
                        className="w-full text-[#f43f5e] hover:underline cursor-pointer"
                    >
                        Sign out
                    </button>
                    {message && <p className="text-sm text-[#6b7280] mt-2">{message}</p>}
                </form>
                {needsConfirmation && (
                    <div className="space-y-4 mt-6">
                        <input
                            className="w-full p-2 border rounded text-[#111827]"
                            type="text"
                            placeholder="Confirmation code"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="w-full bg-[#4f46e5] text-white py-2 rounded hover:bg-[#4338ca]"
                            onClick={handleConfirm}
                        >
                            Confirm Account
                        </button>
                        <button
                            type="button"
                            className="w-full bg-[#f59e0b] text-white py-2 rounded hover:bg-[#d97706]"
                            onClick={handleResendCode}
                        >
                            Resend Confirmation Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}