import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useLetter } from '@/hooks/useLetter'
import { Edit, Trash2 } from 'lucide-react'
import GlobalPagination from '@/components/common/GlobalPagination';

export const LetterTable = ({ onEdit, onDelete }) => {
    const { letters, isLoading, error, totalPages, currentPage, setPage, setLimit } = useLetter()

    console.log("letters", letters)

    if (isLoading) return (
        <Card className="w-full h-[500px]">
            <CardContent className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </CardContent>
        </Card>
    )

    if (error) return (
        <Card className="w-full h-[500px]">
            <CardContent className="text-center py-4 text-destructive">
                Error: {error.message}
            </CardContent>
        </Card>
    )

    if (letters.length === 0) {
        return (
            <Card className="w-full h-[550px] flex flex-col">
                <CardHeader>
                    <CardTitle>Letters</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                    <p className="text-muted-foreground">No letters available.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full h-[550px] flex flex-col">
            <CardHeader>
                <CardTitle>Letters</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <div className="h-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-muted">
                                <TableHead className="w-[30%]">Date</TableHead>
                                <TableHead className="w-[50%]">Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {letters.map((letter, index) => (
                                <TableRow
                                    key={letter._id}
                                    className={index !== letters.length - 1 ? "border-b border-muted/50" : ""}
                                >
                                    <TableCell className="font-medium py-4">{new Date(letter.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="py-4">{letter.title}</TableCell>
                                    <TableCell className="text-right py-4">
                                        <Button
                                            onClick={() => onEdit(letter)}
                                            variant="ghost"
                                            size="icon"
                                            className="mr-2"
                                        >
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button
                                            onClick={() => onDelete(letter._id)}
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            {letters.length > 0 && (
                <CardFooter className="flex justify-between items-center">
                    <div>
                        Showing {(currentPage - 1) * letters.length + 1} to {currentPage * letters.length} of {totalPages * letters.length} entries
                    </div>
                    <GlobalPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setPage(page)}
                    />
                </CardFooter>
            )}
        </Card>
    )
}