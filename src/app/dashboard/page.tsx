'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SpendingSummary from '@/components/dashboard/SpendingSummary';
import TransactionList from '@/components/TransactionList';
import AccountsSummary from '@/components/dashboard/AccountsSummary';
import BudgetCategories from '@/components/dashboard/BudgetCategories';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
    const isAuthenticated = useAppStore((state) => state.isAuthenticated);
    const loading = useAppStore((state) => state.loading);
    const fullName = useAppStore((state) => state.fullName);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/');
        }
    }, [loading, isAuthenticated, router]);

    const [today, setToday] = useState('');

    const { data: transactions, isLoading, isError } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await fetch('/api/transactions/fetch');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });

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
        <main className="p-8 bg-[#f9fafb]">
            {/* Greeting + To Be Budgeted */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#4f46e5]">Hey {firstName}! Let&#39;s budget.</h1>
                    <p className="text-sm text-[#6b7280]">{today}</p>
                </div>
                <div className="bg-[#4f46e5] text-white px-6 py-4 rounded-md shadow text-center flex">
                    <p className="text-xs uppercase mb-1 tracking-wide text-white/70">To Be <br />Budgeted</p>
                    <p className="text-2xl ml-4 font-semibold">£1,242.50</p>
                </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SpendingSummary />
                <AccountsSummary />
            </div>
            <div className="mb-6">

                {/* Recent Transactions */}
                <TransactionList
                    headingText="Recent Transactions"
                    showHeading={true}
                    showViewAll={true}
                    limit={5}
                    transactions={transactions}
                    loading={isLoading}
                    error={isError}
                />
            </div>

            {/* Budget Categories */}
            <BudgetCategories />

        </main>
    );
}