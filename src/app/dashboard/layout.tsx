import Sidebar from '../../components/Sidebar';

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