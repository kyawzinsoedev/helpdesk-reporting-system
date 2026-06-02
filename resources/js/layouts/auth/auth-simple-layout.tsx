import type { AuthLayoutProps } from '@/types';
import HelpDeskImg from '../../../assets/HelpDesk.jpg';

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background">
            <div className="grid h-full lg:grid-cols-2">
                {/* Left */}
                <div className="flex h-full items-center justify-center overflow-y-auto p-8">
                    {children}
                </div>

                {/* Right */}
                <div className="hidden h-full overflow-hidden lg:block">
                    <img
                        src={HelpDeskImg}
                        alt="HelpDesk"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
