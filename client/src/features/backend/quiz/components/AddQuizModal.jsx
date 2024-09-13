import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export const AddQuizModal = ({ isOpen, onClose, onAdd }) => {
    const [newQuiz, setNewQuiz] = useState({ question: '', options: ['', '', '', ''], correctAnswer: 0 })

    const handleAdd = () => {
        onAdd(newQuiz)
        setNewQuiz({ question: '', options: ['', '', '', ''], correctAnswer: 0 })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Quiz</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="question" className="text-right">Question</Label>
                        <Input id="question" value={newQuiz.question} onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })} className="col-span-3" />
                    </div>
                    {newQuiz.options.map((option, index) => (
                        <div key={index} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`option-${index}`} className="text-right">Option {index + 1}</Label>
                            <Input id={`option-${index}`} value={option} onChange={(e) => {
                                const newOptions = [...newQuiz.options]
                                newOptions[index] = e.target.value
                                setNewQuiz({ ...newQuiz, options: newOptions })
                            }} className="col-span-3" />
                        </div>
                    ))}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="correctAnswer" className="text-right">Correct Answer</Label>
                        <Input id="correctAnswer" type="number" min="0" max="3" value={newQuiz.correctAnswer} onChange={(e) => setNewQuiz({ ...newQuiz, correctAnswer: parseInt(e.target.value) })} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd}>Add Quiz</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}