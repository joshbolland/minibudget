'use client';

import { LayoutDashboard, CreditCard, PieChart, Wallet, List, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAppStore';
import Link from 'next/link';

export default function Sidebar() {
    const { logout, fullName } = useAuthStore();

    return (
        <aside className="w-64 bg-[#4f46e5] text-white flex flex-col h-screen">
            <div className="px-6 py-4 border-b border-white/10">
                <span className="font-bold text-lg">minibudget</span>
            </div>
            <div className="px-6 py-6 text-center border-b border-white/10">
                <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-2" />
                <div className="text-sm">{fullName}</div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-3 text-sm">
                <SidebarLink icon={LayoutDashboard} label="Dashboard" />
                <SidebarLink icon={CreditCard} label="Budget" />
                <SidebarLink icon={PieChart} label="Reports" />
                <SidebarLink icon={Wallet} label="All Accounts" />
                <SidebarLink icon={List} label="Transactions" />
                <SidebarLink icon={Settings} label="Settings" />
            </nav>
            <div className="px-4 py-4 border-t border-white/10">
                <button onClick={logout} className="flex items-center gap-2 text-sm text-white hover:text-red-300">
                    <LogOut className="w-4 h-4" />
                    Sign out
                </button>
            </div>
        </aside>
    );
}

import type { LucideIcon } from 'lucide-react';

function SidebarLink({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
    return (
        <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-indigo-500 transition"
        >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </Link>
    );
}