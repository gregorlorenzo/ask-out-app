import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const GlobalPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const displayedPages = [];
        if (totalPages <= 5) {
            return pageNumbers.map(number => (
                <PaginationItem key={number}>
                    <PaginationLink
                        href="#"
                        onClick={() => onPageChange(number)}
                        isActive={currentPage === number}
                    >
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ));
        }

        if (currentPage <= 3) {
            displayedPages.push(...pageNumbers.slice(0, 3), <PaginationEllipsis key="ellipsis1" />, totalPages);
        } else if (currentPage >= totalPages - 2) {
            displayedPages.push(1, <PaginationEllipsis key="ellipsis2" />, ...pageNumbers.slice(-3));
        } else {
            displayedPages.push(
                1,
                <PaginationEllipsis key="ellipsis3" />,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                <PaginationEllipsis key="ellipsis4" />,
                totalPages
            );
        }

        return displayedPages.map((item, index) =>
            typeof item === 'number' ? (
                <PaginationItem key={index}>
                    <PaginationLink
                        href="#"
                        onClick={() => onPageChange(item)}
                        isActive={currentPage === item}
                    >
                        {item}
                    </PaginationLink>
                </PaginationItem>
            ) : item
        );
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default GlobalPagination;