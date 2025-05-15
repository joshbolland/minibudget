import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#f9fafb] h-screen p-6">{children}</main>
        </div>
    );
}