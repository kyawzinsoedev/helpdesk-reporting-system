import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import categories from '@/routes/categories';

import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('hit');
        post(categories.store().url);
    }

    return (
        <>
            <Head title="Categories" />

            <div className="m-4 flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl space-y-4"
                >
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="max-w-md">
                            <AlertCircleIcon />
                            <AlertTitle>Errors</AlertTitle>
                            {/* <AlertDescription>
                                <ul className="mt-2 list-disc pl-5">
                                    {Object.values(errors).map(
                                        (error, index) => (
                                            <li key={index}>{error}</li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription> */}
                            <AlertDescription>
                                {Object.entries(errors).map(
                                    ([field, message]) => (
                                        <p key={field}>
                                            <strong>{field}:</strong> {message}
                                        </p>
                                    ),
                                )}
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Category Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter Category Name"
                        />
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
                    </div>

                    <div className="flex justify-end gap-5">
                        <Button type="reset">Cancel</Button>

                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Create New Categories',
            href: categories.create().url,
        },
    ],
};
