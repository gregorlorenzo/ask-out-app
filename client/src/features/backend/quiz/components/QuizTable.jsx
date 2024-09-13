import React from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const QuizTable = ({ quizzes, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Question</TableHead>
          <TableHead>Options</TableHead>
          <TableHead>Correct Answer</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quizzes.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.question}</TableCell>
            <TableCell>{quiz.options.join(', ')}</TableCell>
            <TableCell>{quiz.options[quiz.correctAnswer]}</TableCell>
            <TableCell>
              <Button variant="outline" className="mr-2" onClick={() => onEdit(quiz)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDelete(quiz)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}