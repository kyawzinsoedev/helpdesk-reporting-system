import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircleIcon, MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import categories from '@/routes/categories';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: category.name,
        description: category.description,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // console.log('hit');
        put(categories.update(category.id).url);
    }

    return (
        <>
            <Head title="Edit Categories" />
            <div className="m-4 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    <Link
                        href={categories.index().url}
                        className="mb-4 flex items-center justify-end gap-2 text-sm text-gray-600 hover:text-white"
                    >
                        <MoveLeft className="h-4 w-4" />
                        Back to Index Page
                    </Link>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl space-y-4"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Category Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter Category Name"
                        />
                        {errors.name && (
                            <div className="flex items-center gap-2 text-sm text-red-500">
                                <AlertCircleIcon className="h-4 w-4" />
                                <span>{errors.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            id="description"
                            placeholder="Enter Description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        {errors.description && (
                            <div className="flex items-center gap-2 text-sm text-red-500">
                                <AlertCircleIcon className="h-4 w-4" />
                                <span>{errors.description}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-5">
                        <Button onClick={() => reset()} type="reset">
                            Clear
                        </Button>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Editing...' : 'Edit'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Edit Category',
            href: categories.create().url,
        },
    ],
};
