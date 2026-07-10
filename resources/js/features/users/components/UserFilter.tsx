import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    filters: {
        search?: string;
    };
}

export default function UserFilter({ filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/users',
            {
                search: value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <Input
            className="w-100"
            placeholder="Search users..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}
