'use client';

import React from 'react';
import { useGetBudgetCategories } from '@/hooks/useBudgetCategories';

function getBudgetColor(percent: number): string {
    const hue = 120 - (percent * 1.2); // 0% = green (120), 100% = red (0)
    return `hsl(${hue}, 100%, 50%)`;
}

export default function BudgetCategories() {
    const { data: categories = [], isLoading } = useGetBudgetCategories();

    return (
        <div className="bg-white p-6 rounded-md shadow mt-6">
            <h2 className="text-sm text-[#6b7280] uppercase tracking-wide mb-4">Budget Categories</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {categories.map((category) => {
                        const spent = typeof category.spent === 'number' ? category.spent : 0;
                        const budgeted = typeof category.budgeted === 'number' ? category.budgeted : 1; // avoid divide-by-zero
                        const percent = Math.min((spent / budgeted) * 100, 100);
                        return (
                            <li key={category.id} className="py-3 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">
                                        {{
                                            'Groceries': '🛒',
                                            'Transport': '🚇',
                                            'Eating Out': '🍽️',
                                            'Utilities': '💡',
                                            'Entertainment': '🎵',
                                            'Other': '💼'
                                        }[category.name] || '💰'}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-[#111827]">{category.name}</p>
                                        <p className="text-xs text-[#6b7280]">
                                            <span className="font-semibold text-[#4b5563]">£{spent.toFixed(2)}</span>
                                            {' '}spent of{' '}
                                            <span className="font-semibold">£{budgeted.toFixed(2)}</span> budgeted
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-2 mt-1">
                                    <div
                                        className="h-2 rounded"
                                        style={{
                                            width: `${percent}%`,
                                            backgroundColor: getBudgetColor(percent),
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}