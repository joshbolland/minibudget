'use client';

const mockAccounts = [
    { id: '1', name: 'Monzo Current', type: 'Bank', balance: 814.75 },
    { id: '2', name: 'Chase Saver', type: 'Savings', balance: 3250.00 },
    { id: '3', name: 'Amex Credit', type: 'Credit Card', balance: -142.20 },
];

export default function AccountsSummary() {
    return (
        <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-sm text-[#6b7280] uppercase tracking-wide mb-4">Accounts</h2>
            <ul className="divide-y divide-gray-200">
                {mockAccounts.map(account => (
                    <li key={account.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-lg">
                                {{
                                    'Bank': '🏦',
                                    'Savings': '💰',
                                    'Credit Card': '💳'
                                }[account.type] || '💼'}
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
        </div>
    );
}
