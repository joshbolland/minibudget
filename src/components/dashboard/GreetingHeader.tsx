'use client';
interface GreetingHeaderProps {
    firstName: string;
    today: string;
}
export function GreetingHeader({ firstName, today }: GreetingHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-[#4f46e5]">Hey {firstName}! Let&#39;s budget.</h1>
                <p className="text-sm text-[#6b7280]">{today}</p>
            </div>
        </div>
    );
}
