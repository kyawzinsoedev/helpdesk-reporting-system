import { Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const isDark = appearance === 'dark';

    return (
        <button
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            className={cn(
                'inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700',
                className,
            )}
            {...props}
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </button>
    );
}
