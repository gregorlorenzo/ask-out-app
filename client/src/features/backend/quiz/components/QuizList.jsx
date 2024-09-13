import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { QuizTable } from './QuizTable'
import { AddQuizModal } from './AddQuizModal'
import { EditQuizModal } from './EditQuizModal'
import { DeleteQuizModal } from './DeleteQuizModal'
import { useQuiz } from '@/hooks/useQuiz'
import { useToast } from "@/hooks/use-toast"

export const QuizList = () => {
  const { getQuestions, createQuestion, updateQuestion, deleteQuestion, isLoading, error } = useQuiz()
  const { data: quizzes } = getQuestions
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const { toast } = useToast()

  const handleAdd = (newQuiz) => {
    createQuestion(newQuiz, {
      onSuccess: () => {
        setIsAddModalOpen(false)
        toast({ title: "Quiz added successfully" })
      },
      onError: (error) => {
        toast({ title: "Error adding quiz", description: error.message, variant: "destructive" })
      }
    })
  }

  const handleEdit = (editedQuiz) => {
    updateQuestion({ id: editedQuiz.id, questionData: editedQuiz }, {
      onSuccess: () => {
        setIsEditModalOpen(false)
        setCurrentQuiz(null)
        toast({ title: "Quiz updated successfully" })
      },
      onError: (error) => {
        toast({ title: "Error updating quiz", description: error.message, variant: "destructive" })
      }
    })
  }

  const handleDelete = () => {
    if (currentQuiz) {
      deleteQuestion(currentQuiz.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false)
          setCurrentQuiz(null)
          toast({ title: "Quiz deleted successfully" })
        },
        onError: (error) => {
          toast({ title: "Error deleting quiz", description: error.message, variant: "destructive" })
        }
      })
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsAddModalOpen(true)}>Add Quiz</Button>

      <QuizTable
        quizzes={quizzes}
        onEdit={(quiz) => {
          setCurrentQuiz(quiz)
          setIsEditModalOpen(true)
        }}
        onDelete={(quiz) => {
          setCurrentQuiz(quiz)
          setIsDeleteModalOpen(true)
        }}
      />

      <AddQuizModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <EditQuizModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setCurrentQuiz(null)
        }}
        onEdit={handleEdit}
        quiz={currentQuiz}
      />

      <DeleteQuizModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setCurrentQuiz(null)
        }}
        onDelete={handleDelete}
      />
    </div>
  )
}