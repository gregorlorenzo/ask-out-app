import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'

const quizSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    options: z.array(z.string()).min(2, 'At least 2 options are required').max(4, 'Maximum 4 options allowed'),
    correctAnswer: z.number().min(0, 'Correct answer is required').max(3, 'Correct answer must be between 0 and 3'),
})

export const QuizForm = ({ initialData, onSubmit, onCancel }) => {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: initialData || { question: '', options: ['', '', '', ''], correctAnswer: 0 },
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="question" className="text-sm font-medium">
                        Question
                    </Label>
                    <Textarea
                        id="question"
                        {...register('question')}
                        className="mt-1 resize-none"
                        rows={3}
                    />
                    {errors.question && (
                        <p className="mt-1 text-sm text-destructive">{errors.question.message}</p>
                    )}
                </div>

                <div>
                    <Label className="text-sm font-medium">Options</Label>
                    <p className="text-sm text-muted-foreground mb-2">Click an option to set it as the correct answer.</p>
                    <Card className="mt-2">
                        <CardContent className="p-4">
                            <Controller
                                name="correctAnswer"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-3">
                                        {[0, 1, 2, 3].map((index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center space-x-3 p-2 rounded-md transition-colors cursor-pointer ${field.value === index ? 'bg-primary/10' : 'hover:bg-muted'
                                                    }`}
                                                onClick={() => field.onChange(index)}
                                            >
                                                <div className="w-6 h-6 flex items-center justify-center">
                                                    {field.value === index && (
                                                        <Check className="h-4 w-4 text-primary" />
                                                    )}
                                                </div>
                                                <Input
                                                    {...register(`options.${index}`)}
                                                    placeholder={`Option ${index + 1}`}
                                                    className="flex-grow"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </CardContent>
                    </Card>
                    {errors.options && (
                        <p className="mt-1 text-sm text-destructive">{errors.options.message}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    )
}