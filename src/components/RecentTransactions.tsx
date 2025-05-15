'use client';

const mockTransactions = [
    { id: '1', date: '15 May 2025', category: 'Groceries', description: 'Tesco', amount: -32.50 },
    { id: '2', date: '14 May 2025', category: 'Transport', description: 'TFL', amount: -2.90 },
    { id: '3', date: '14 May 2025', category: 'Eating Out', description: 'Pret', amount: -8.25 },
    { id: '4', date: '13 May 2025', category: 'Utilities', description: 'Octopus Energy', amount: -45.00 },
    { id: '5', date: '13 May 2025', category: 'Entertainment', description: 'Spotify', amount: -9.99 },
];

export default function RecentTransactions() {
    return (
        <div className="bg-white p-6 rounded-md shadow mt-6">
            <h2 className="text-sm text-[#6b7280] uppercase tracking-wide mb-4">Recent Transactions</h2>
            <ul className="divide-y divide-gray-200">
                {mockTransactions.map(tx => (
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
        </div>
    );
}