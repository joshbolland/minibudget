import Sidebar from '../../components/Sidebar';

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'minibudget dashboard',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-[#f9fafb] overflow-y-auto p-6">{children}</main>
        </div>
    );
}