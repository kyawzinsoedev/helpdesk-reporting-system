import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LucidePenLine, Megaphone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import routeCategories from '@/routes/categories';
import type { PageProps } from '@/types/page-props';

interface Category {
    id: number;
    name: string;
    description: string | null;
}

type CategoriesPageProps = PageProps & {
    categories: Category[];
};
export default function Index() {
    const { categories, flash } = usePage<CategoriesPageProps>().props;
    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a category . ${id} . ${name}`)) {
            destroy(routeCategories.destroy(id).url);
        }
    };

    return (
        <>
            <Head title="Categories" />

            <div className="m-4">
                <Button asChild>
                    <Link href={routeCategories.create().url}>
                        Create Categories
                    </Link>
                </Button>
            </div>
            <div className="m-4" hidden={!flash?.message}>
                <div>
                    {flash?.message && (
                        <Alert className="max-w-md border-green-500 text-green-600">
                            <Megaphone />
                            <AlertTitle>Alert</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            <div className="m-4 rounded-lg border p-4">
                {categories.length > 0 ? (
                    <Table>
                        <TableCaption>
                            A list of your recent Categories.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category: Category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">
                                        {category.id}
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        {category.description}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={
                                                    routeCategories.edit(
                                                        category.id,
                                                    ).url
                                                }
                                            >
                                                <Button>Edit</Button>
                                            </Link>
                                            <Button
                                                disabled={processing}
                                                onClick={() =>
                                                    handleDelete(
                                                        category.id,
                                                        category.name,
                                                    )
                                                }
                                                className="bg-red-500"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="py-10 text-center text-gray-400">
                        No categories found.
                    </p>
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Categories Index',
            href: routeCategories.index().url,
        },
    ],
};
