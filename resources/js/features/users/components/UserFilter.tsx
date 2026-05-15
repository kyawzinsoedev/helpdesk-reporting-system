import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function UserFilter() {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    className="bg-background pl-9"
                />
            </div>
            {/* Optional: Add Department Filter Select here */}
        </div>
    );
}
