import React, { useState } from 'react'
import { QuizTable } from './QuizTable'
import { QuizDialog } from './QuizDialog'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { useQuiz } from '@/hooks/useQuiz'
import { useToast } from '@/hooks/use-toast'
import { PlusCircle } from 'lucide-react'

export const QuizManager = () => {
    const { createQuestion, updateQuestion, deleteQuestion } = useQuiz()
    const { toast } = useToast()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(null)

    const handleAddQuestion = (data) => {
        createQuestion(data, {
            onSuccess: () => {
                setIsAddDialogOpen(false)
                toast({
                    title: 'Success',
                    description: 'Question added successfully',
                })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to add question: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    const handleEditQuestion = (data) => {
        updateQuestion(
            { id: currentQuestion._id, questionData: data },
            {
                onSuccess: () => {
                    setIsEditDialogOpen(false)
                    toast({
                        title: 'Success',
                        description: 'Question updated successfully',
                    })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: `Failed to update question: ${error.message}`,
                        variant: 'destructive',
                    })
                },
            }
        )
    }

    const handleDeleteQuestion = () => {
        deleteQuestion(currentQuestion._id, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false)
                toast({
                    title: 'Success',
                    description: 'Question deleted successfully',
                })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to delete question: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Quiz Manager</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Question
                </Button>
            </div>
            <QuizTable
                onEdit={(question) => {
                    setCurrentQuestion(question)
                    setIsEditDialogOpen(true)
                }}
                onDelete={(id) => {
                    setCurrentQuestion({ _id: id })
                    setIsDeleteDialogOpen(true)
                }}
            />
            <QuizDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSubmit={handleAddQuestion}
                title="Add New Question"
            />
            <QuizDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSubmit={handleEditQuestion}
                initialData={currentQuestion}
                title="Edit Question"
            />
            <Dialog open={isDeleteDialogOpen} onOpenChange={() => setIsDeleteDialogOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Question</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this question? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteQuestion}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}