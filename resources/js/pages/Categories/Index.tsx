import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import categories from '@/routes/categories';

export default function Index() {
    return (
        <>
            <Head title="Categories" />

            <div className="m-4">
                <Button asChild>
                    <Link href={categories.create().url}>
                        Create Categories
                    </Link>
                </Button>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Categories Index',
            href: categories.index().url,
        },
    ],
};
