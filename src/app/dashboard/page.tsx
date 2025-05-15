'use client';

import { useAuthStore } from '../../store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const { isAuthenticated, loading, fullName } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/');
        }
    }, [loading, isAuthenticated, router]);

    if (loading) return <p>Loading...</p>;

    const firstName = fullName.split(' ')[0];

    return (
        <main className="min-h-screen p-8 bg-[#f9fafb]">
            <h1 className="text-2xl font-bold mb-4 text-[#4f46e5]">Welcome, {firstName}</h1>
            {/* budget-related UI will go here later */}
        </main>
    );
}