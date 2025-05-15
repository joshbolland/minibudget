'use client';

import { useAuthStore } from '../../store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SpendingSummary from '../../components/SpendingSummary';

export default function Dashboard() {
    const { isAuthenticated, loading, fullName } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/');
        }
    }, [loading, isAuthenticated, router]);

    const [today, setToday] = useState('');

    useEffect(() => {
        const formatted = new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setToday(formatted);
    }, []);

    if (loading) return <p>Loading...</p>;

    const firstName = fullName.split(' ')[0];

    return (
        <main className=" p-8 bg-[#f9fafb]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#4f46e5]">Hey {firstName}! Let&#39;s budget.</h1>
                    <p className="text-sm text-[#6b7280]">{today}</p>
                </div>
                <div className="bg-[#4f46e5] text-white px-6 py-4 rounded-md shadow text-center flex">
                    <p className="text-xs uppercase mb-1 tracking-wide text-white/70">To Be <br></br>Budgeted</p>
                    <p className="text-2xl ml-4 font-semibold">£1,242.50</p>
                </div>
            </div>
            <SpendingSummary />
        </main>
    );
}