'use client';

import type { Transaction } from '@/types/transaction.ts';

interface TransactionListProps {
    headingText?: string;
    showHeading?: boolean;
    showViewAll?: boolean;
    limit?: number;
    transactions?: Transaction[];
    loading?: boolean;
    error?: boolean;
}

export default function TransactionList({ headingText = 'Recent Transactions', showHeading = true, showViewAll = true, limit, transactions = [], loading = false, error = false }: TransactionListProps) {

    const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

    return (
        <div className="bg-white p-6 rounded-md shadow mt-6">
            {showHeading && (
                <div className="flex items-center justify-between">
                    <h2 className="text-sm text-[#6b7280] uppercase tracking-wide mb-4">{headingText}</h2>
                    {showViewAll && (
                        <a href="/transactions" className="text-sm text-[#4f46e5] mb-4">View all</a>
                    )}
                </div>
            )}
            {loading ? (
                <div className="flex items-center justify-center h-32">
                    <svg className="animate-spin h-5 w-5 text-[#4f46e5]" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="#4f46e5" fill="none"></circle>
                        <path className="opacity-75" fill="#4f46e5" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"></path>
                    </svg>
                </div>
            ) : error ? (
                <p className="text-red-500">Failed to load transactions.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {displayedTransactions.map(tx => (
                        <li key={tx.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">
                                    {{
                                        'Groceries': '🛒',
                                        'Transport': '🚇',
                                        'Eating Out': '🍽️',
                                        'Utilities': '💡',
                                        'Entertainment': '🎵'
                                    }[tx.category] || '💰'}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-[#111827]">{tx.description}</p>
                                    <p className="text-xs text-[#6b7280]">{tx.category} • {tx.date}</p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-[#ef4444]">£{Math.abs(tx.amount).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}