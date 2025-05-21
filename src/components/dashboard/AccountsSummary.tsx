'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';
import type { Account } from '@/store/slices/accountSlice';

export default function AccountsSummary() {

    const accounts = useAppStore((state) => state.accounts);
    const loading = useAppStore((state) => state.loading);
    const fetchAccounts = useAppStore((state) => state.fetchAccounts);

    useEffect(() => {
        fetchAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-sm text-[#6b7280] uppercase tracking-wide mb-4">Accounts</h2>
            {loading ? (
                <div className="flex items-center justify-center h-32">
                    <svg className="animate-spin h-5 w-5 text-[#4f46e5]" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="#4f46e5" fill="none"></circle>
                        <path className="opacity-75" fill="#4f46e5" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"></path>
                    </svg>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {accounts.map((account: Account) => (
                        <li key={account.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">
                                    {({
                                        'Bank': '🏦',
                                        'Savings': '💰',
                                        'Credit Card': '💳'
                                    }[account.type] || '💼')}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-[#111827]">{account.name}</p>
                                    <p className="text-xs text-[#6b7280]">{account.type}</p>
                                </div>
                            </div>
                            <p className={`text-sm font-semibold ${account.balance < 0 ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
                                £{account.balance.toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
