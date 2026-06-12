interface Props {
    status: number;
}

export default function Error({ status }: Props) {
    const title = {
        403: '403',
        404: '404',
        500: '500',
        503: '503',
    }[status];

    const description = {
        403: 'Forbidden',
        404: 'Page Not Found',
        500: 'Server Error',
        503: 'Service Unavailable',
    }[status];

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold">{title}</h1>
                <p className="mt-4">{description}</p>
            </div>
        </div>
    );
}
