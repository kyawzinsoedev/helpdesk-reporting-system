import { router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginatedData } from '@/features/tickets/types/tickets';

interface Props<T> {
    pagination: PaginatedData<T>;
}

export default function AppPagination<T>({ pagination }: Props<T>) {
    const { links } = pagination;

    if (links.length <= 3) return null;

    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => {
                    if (link.label.includes('Previous')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url ?? '#'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) {
                                            router.visit(link.url, {
                                                preserveScroll: true,
                                                preserveState: true,
                                            });
                                        }
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label.includes('Next')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url ?? '#'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) {
                                            router.visit(link.url, {
                                                preserveScroll: true,
                                                preserveState: true,
                                            });
                                        }
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={link.url ?? '#'}
                                isActive={link.active}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) {
                                        router.visit(link.url, {
                                            preserveScroll: true,
                                            preserveState: true,
                                        });
                                    }
                                }}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
