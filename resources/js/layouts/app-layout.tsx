import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import TopHeader from '@/components/TopHeader';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-muted/40">
            {/* Main Container */}
            <div className="mx-auto min-h-screen max-w-6xl border-x bg-background shadow-xl">
                {/* Top Header */}
                <TopHeader />

                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
