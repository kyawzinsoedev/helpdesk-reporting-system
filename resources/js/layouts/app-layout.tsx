import Navbar from '@/features/layouts/Navbar/Navbar';
import TopHeader from '@/features/layouts/TopHeader/TopHeader';
import type { ReactNode } from 'react';

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
                <main>{children}</main>
            </div>
        </div>
    );
}
