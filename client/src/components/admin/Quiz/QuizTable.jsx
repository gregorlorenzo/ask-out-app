import React, { useState } from 'react'
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
import { useQuiz } from '@/hooks/useQuiz'
import { Edit, Trash2 } from 'lucide-react'
import GlobalPagination from '@/components/common/GlobalPagination';

const AnswerCircle = ({ letter, isCorrect }) => (
  <div
    className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 ${isCorrect ? 'bg-primary text-primary-foreground' : 'border-primary text-primary'
      }`}
  >
    {letter}
  </div>
)

export const QuizTable = ({ onEdit, onDelete }) => {
  const { questions, isLoading, error } = useQuiz()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

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

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = questions.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(questions.length / rowsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full h-[550px] flex flex-col">
        <CardHeader>
          <CardTitle>Quiz Questions</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <p className="text-muted-foreground">No questions available.</p>
        </CardContent>
      </Card>
    )
  }

  const rowsToRender = Array(5).fill(null);

  return (
    <Card className="w-full h-[550px] flex flex-col">
      <CardHeader>
        <CardTitle>Quiz Questions</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-muted">
                <TableHead className="w-[60%]">Question</TableHead>
                <TableHead className="w-[30%]">Answer Options</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowsToRender.map((_, index) => {
                const question = currentRows[index];
                return (
                  <TableRow
                    key={question ? question._id : `empty-${index}`}
                    className={index !== 4 ? "border-b border-muted/50" : ""}
                  >
                    {question ? (
                      <>
                        <TableCell className="font-medium py-4">{question.question}</TableCell>
                        <TableCell className="py-4">
                          <div className="flex space-x-2">
                            {['A', 'B', 'C', 'D'].map((letter, i) => (
                              <AnswerCircle
                                key={i}
                                letter={letter}
                                isCorrect={i === question.correctAnswer}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <Button
                            onClick={() => onEdit(question)}
                            variant="ghost"
                            size="icon"
                            className="mr-2"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            onClick={() => onDelete(question._id)}
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="py-4">&nbsp;</TableCell>
                        <TableCell className="py-4">&nbsp;</TableCell>
                        <TableCell className="py-4">&nbsp;</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {questions.length > 0 && (
        <CardFooter className="flex justify-between items-center">
          <div>
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, questions.length)} of {questions.length} entries
          </div>
          <GlobalPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      )}
    </Card>
  )
}