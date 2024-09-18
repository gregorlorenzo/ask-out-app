import React, { useEffect } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useLetter } from '@/hooks/useLetter'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const LetterTable = ({ onEdit, onDelete }) => {
    const {
        letters,
        totalPages,
        currentPage,
        totalItems,
        setPage,
        setLimit,
        setSort,
        isLoading,
        error
    } = useLetter()
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])

    useEffect(() => {
        if (sorting.length > 0) {
            const [{ id, desc }] = sorting;
            setSort(`${desc ? '-' : ''}${id}`);
        }
    }, [sorting, setSort]);

    const columns = [
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{new Date(row.getValue("date")).toLocaleDateString()}</div>,
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <div>{row.getValue("title")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const letter = row.original
                if (!letter || !letter._id) return null
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEdit(letter)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete(letter._id)}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data: letters,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        manualPagination: true,
        manualSorting: true,
        pageCount: totalPages,
    })

    if (isLoading) return (
        <Card className="w-full h-[600px]">
            <CardContent className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </CardContent>
        </Card>
    )

    if (error) return (
        <Card className="w-full h-[600px]">
            <CardContent className="text-center py-4 text-destructive">
                Error: {error.message}
            </CardContent>
        </Card>
    )

    return (
        <Card className="w-full h-[600px] flex flex-col">
            <CardHeader>
                <CardTitle>Letters</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter dates..."
                        value={(table.getColumn("date")?.getFilterValue() ?? "")}
                        onChange={(event) =>
                            table.getColumn("date")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <div className="rounded-md border flex-grow overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {letters.length ? (
                                [...Array(5)].map((_, index) => {
                                    const row = table.getRowModel().rows[index]
                                    return (
                                        <TableRow key={row ? row.id : `empty-${index}`} className="h-16">
                                            {columns.map((column, cellIndex) => (
                                                <TableCell key={`${index}-${cellIndex}`} className="py-0">
                                                    <div className="h-full flex items-center">
                                                        {row
                                                            ? flexRender(
                                                                column.cell,
                                                                row.getVisibleCells()[cellIndex].getContext()
                                                            )
                                                            : "\u00A0"}
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <span className="inline-block w-32">{totalItems} letter(s) total</span>
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}