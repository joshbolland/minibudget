'use client';

import TransactionList from '@/components/TransactionList';
import { useQuery } from '@tanstack/react-query';


export default function TransactionsPage() {

    const { data: transactions, isLoading, isError } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await fetch('/api/transactions/fetch');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-[#111827] mb-4">Transactions</h1>
            <div className="mb-6">

                {/* Transactions */}
                <TransactionList headingText="All Transactions"
                    showHeading={true}
                    showViewAll={false}
                    limit={10}
                    transactions={transactions}
                    loading={isLoading}
                    error={isError} />
            </div>
        </div>
    );
}
