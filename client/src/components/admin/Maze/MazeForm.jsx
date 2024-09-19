import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mazeSchema = z.object({
    number: z.number().min(1, 'Stage number is required'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    width: z.number().min(5, 'Width must be at least 5').max(20, 'Width must be at most 20'),
    height: z.number().min(5, 'Height must be at least 5').max(20, 'Height must be at most 20'),
})

export const MazeForm = ({ initialData, onSubmit, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(mazeSchema),
        defaultValues: initialData || { number: '', difficulty: 'easy', width: '', height: '' },
    })

    const handleFormSubmit = (data) => {
        onSubmit({
            number: data.number,
            difficulty: data.difficulty,
            width: data.width,
            height: data.height
        })
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="number" className="text-sm font-medium">
                        Stage Number
                    </Label>
                    <Input
                        id="number"
                        type="number"
                        {...register('number', { valueAsNumber: true })}
                        className="mt-1"
                    />
                    {errors.number && (
                        <p className="mt-1 text-sm text-destructive">{errors.number.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="difficulty" className="text-sm font-medium">
                        Difficulty
                    </Label>
                    <Select {...register('difficulty')}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.difficulty && (
                        <p className="mt-1 text-sm text-destructive">{errors.difficulty.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="width" className="text-sm font-medium">
                        Width
                    </Label>
                    <Input
                        id="width"
                        type="number"
                        {...register('width', { valueAsNumber: true })}
                        className="mt-1"
                    />
                    {errors.width && (
                        <p className="mt-1 text-sm text-destructive">{errors.width.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="height" className="text-sm font-medium">
                        Height
                    </Label>
                    <Input
                        id="height"
                        type="number"
                        {...register('height', { valueAsNumber: true })}
                        className="mt-1"
                    />
                    {errors.height && (
                        <p className="mt-1 text-sm text-destructive">{errors.height.message}</p>
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