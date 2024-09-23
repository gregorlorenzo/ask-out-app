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
import { useMaze } from '@/hooks/useMaze'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DifficultyBadge = ({ difficulty }) => {
    const colors = {
        easy: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        hard: 'bg-red-100 text-red-800'
    }
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
    )
}

export const MazeTable = ({ onEdit, onDelete }) => {
    const {
        stages,
        totalPages,
        currentPage,
        totalItems,
        setPage,
        setLimit,
        setSort,
        isLoading,
        error
    } = useMaze()
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
            accessorKey: "number",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full text-left font-semibold pl-4 justify-start"
                >
                    Stage
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="text-left pl-4">{row.getValue("number")}</div>,
        },
        {
            accessorKey: "difficulty",
            header: "Difficulty",
            cell: ({ row }) => (
                <div className="text-left pl-4">
                    <DifficultyBadge difficulty={row.getValue("difficulty")} />
                </div>
            ),
        },
        {
            accessorKey: "mazeSize.width",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full text-left font-semibold pl-4 justify-start"
                >
                    Width
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="text-left pl-4">{row.original.mazeSize.width}</div>,
        },
        {
            accessorKey: "mazeSize.height",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full text-left font-semibold pl-4 justify-start"
                >
                    Height
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="text-left pl-4">{row.original.mazeSize.height}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const stage = row.original
                return (
                    <div className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onEdit(stage)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => onDelete(stage._id)}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: stages,
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
                <CardTitle>Maze Stages</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter stages..."
                        value={(table.getColumn("number")?.getFilterValue() ?? "")}
                        onChange={(event) =>
                            table.getColumn("number")?.setFilterValue(event.target.value)
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
                                        <TableHead
                                            key={header.id}
                                            className="bg-gray-100 text-left align-middle"
                                        >
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
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-2 text-left">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No stages available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <span className="inline-block w-32">{totalItems} stage(s) total</span>
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