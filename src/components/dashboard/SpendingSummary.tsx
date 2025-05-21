'use client';

export default function SpendingSummary() {
    // Mock data and donut chart calculations
    const totalBudget = 1200;
    const spent = 768.2;
    const remaining = totalBudget - spent;
    const percentSpent = Math.round((spent / totalBudget) * 100);
    const circumference = 100 * Math.PI;
    const offset = circumference - (percentSpent / 100) * circumference;

    function getBudgetColor(percent: number): string {
        const hue = 120 - (percent * 1.2); // 0% = green (120), 100% = red (0)
        return `hsl(${hue}, 100%, 50%)`;
    }

    const strokeColor = getBudgetColor(percentSpent);

    return (
        <div className="bg-white p-6 rounded-md shadow w-full">
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-[#6b7280] uppercase tracking-wide font-medium">Monthly Budget</p>
                <span className="text-[#6366f1] text-lg font-bold">&rarr;</span>
            </div>
            <div className="text-center mb-6">
                <p className="text-sm text-gray-500 uppercase mb-1">Total to spend</p>
                <p className="text-3xl font-bold text-[#6366f1]">£{totalBudget.toFixed(2)}</p>
            </div>
            <div className="flex justify-center items-center mb-6 relative w-32 h-32 mx-auto">
                <svg className="transform -rotate-90" width="128" height="128" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={strokeColor}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color: strokeColor }}>
                    {percentSpent}%
                </div>
            </div>
            <div className="flex justify-between text-center text-sm font-medium">
                <div className="flex-1 border-r border-gray-200">
                    <p className="text-gray-500 uppercase mb-1">Spent</p>
                    <p className="text-[#ef4444] text-lg">£{spent.toFixed(2)}</p>
                </div>
                <div className="flex-1">
                    <p className="text-gray-500 uppercase mb-1">Remaining</p>
                    <p className="text-[#10b981] text-lg">£{remaining.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
