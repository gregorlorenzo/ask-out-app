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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuiz } from '@/hooks/useQuiz'
import { Edit, Trash2 } from 'lucide-react'

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

  if (isLoading) return (
    <Card className="w-full">
      <CardContent className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </CardContent>
    </Card>
  )

  if (error) return (
    <Card className="w-full">
      <CardContent className="text-center py-4 text-destructive">
        Error: {error.message}
      </CardContent>
    </Card>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quiz Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-muted">
              <TableHead className="w-[60%]">Question</TableHead>
              <TableHead className="w-[30%]">Answer Options</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow
                key={question._id}
                className={index !== questions.length - 1 ? "border-b border-muted/50" : ""}
              >
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}