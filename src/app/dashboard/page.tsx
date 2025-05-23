'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SpendingSummary from '@/components/dashboard/SpendingSummary';
import TransactionList from '@/components/TransactionList';
import AccountsSummary from '@/components/dashboard/AccountsSummary';
import BudgetCategories from '@/components/dashboard/BudgetCategories';
import { useQuery } from '@tanstack/react-query';
import { GreetingHeader } from '../../components/dashboard/GreetingHeader';

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
            <GreetingHeader
                firstName={firstName}
                today={today}
            />


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




