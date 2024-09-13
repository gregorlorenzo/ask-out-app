import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export const EditQuizModal = ({ isOpen, onClose, onEdit, quiz }) => {
    const [editedQuiz, setEditedQuiz] = useState(null)

    useEffect(() => {
        if (quiz) {
            setEditedQuiz({ ...quiz })
        }
    }, [quiz])

    const handleEdit = () => {
        if (editedQuiz) {
            onEdit(editedQuiz)
        }
    }

    const handleInputChange = (field, value, index = null) => {
        if (editedQuiz) {
            if (index !== null) {
                const newOptions = [...editedQuiz.options]
                newOptions[index] = value
                setEditedQuiz({ ...editedQuiz, options: newOptions })
            } else {
                setEditedQuiz({ ...editedQuiz, [field]: value })
            }
        }
    }

    if (!editedQuiz) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Quiz</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="question" className="text-right">Question</Label>
                        <Input
                            id="question"
                            value={editedQuiz.question}
                            onChange={(e) => handleInputChange('question', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {editedQuiz.options.map((option, index) => (
                        <div key={index} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`option-${index}`} className="text-right">Option {index + 1}</Label>
                            <Input
                                id={`option-${index}`}
                                value={option}
                                onChange={(e) => handleInputChange('options', e.target.value, index)}
                                className="col-span-3"
                            />
                        </div>
                    ))}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="correctAnswer" className="text-right">Correct Answer</Label>
                        <Input
                            id="correctAnswer"
                            type="number"
                            min="0"
                            max="3"
                            value={editedQuiz.correctAnswer}
                            onChange={(e) => handleInputChange('correctAnswer', parseInt(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleEdit}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}