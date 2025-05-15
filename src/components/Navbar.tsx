'use client';

import { useAuthStore } from '../store/useAppStore';
import { User, ChevronDown, ChevronUp } from 'lucide-react';

export default function Navbar() {
    const { logout, fullName } = useAuthStore();
    const firstName = fullName.split(' ')[0];

    return (
        <nav className="bg-[#f9fafb] shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <span className="font-semibold text-lg text-[#4f46e5]">minibudget</span>
                <div className="relative">
                    <details className="group">
                        <summary className="cursor-pointer text-[#111827] hover:text-[#f59e0b] flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:border-[#f59e0b]">
                            <User className="w-4 h-4" />
                            <span className="group-open:hidden"><ChevronDown className="w-4 h-4" /></span> <span className="hidden group-open:inline"><ChevronUp className="w-4 h-4" /></span>
                        </summary>
                        <ul className="absolute right-0 mt-2 w-40 bg-white border border-[#e5e7eb] rounded shadow-md z-10">
                            <li>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 hover:bg-[#fef2f2] text-[#f43f5e] hover:cursor-pointer"
                                >
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </details>
                </div>
            </div>
        </nav>
    );
}