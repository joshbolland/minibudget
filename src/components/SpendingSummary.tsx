'use client';

export default function SpendingSummary() {
    // Mock data and donut chart calculations
    const totalBudget = 1200;
    const spent = 768.2;
    const remaining = totalBudget - spent;
    const percentSpent = Math.round((spent / totalBudget) * 100);
    const circumference = 100 * Math.PI;
    const offset = circumference - (percentSpent / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded shadow w-full md:w-1/2">
            <p className="text-sm text-[#6b7280] uppercase mb-1 tracking-wide">Spending This Month</p>
            <div className="flex items-center justify-between gap-6">
                <div className="relative w-24 h-24">
                    <svg className="transform -rotate-90" width="100" height="100" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#ef4444"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#ef4444]">
                        {percentSpent}%
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-[#ef4444]">£{spent.toFixed(2)}</p>
                    <p className="text-sm text-[#10b981]">£{remaining.toFixed(2)} remaining</p>
                </div>
            </div>
        </div>
    );
}
