import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mazeSizes = [
    { label: 'Small', value: 'small', dimensions: { width: 16, height: 16 } },
    { label: 'Medium', value: 'medium', dimensions: { width: 24, height: 24 } },
    { label: 'Large', value: 'large', dimensions: { width: 32, height: 32 } },
];

const mazeSchema = z.object({
    number: z.number().min(1, 'Stage number is required'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    mazeSize: z.object({
        width: z.number().min(5, 'Width must be at least 5').max(50, 'Width must be at most 50'),
        height: z.number().min(5, 'Height must be at least 5').max(50, 'Height must be at most 50'),
    }),
})

export const MazeForm = ({ initialData, onSubmit, onCancel }) => {
    const [selectedSize, setSelectedSize] = useState(initialData?.mazeSize ?
        mazeSizes.find(size =>
            size.dimensions.width === initialData.mazeSize.width &&
            size.dimensions.height === initialData.mazeSize.height
        )?.value || 'small' :
        'small'
    );

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: zodResolver(mazeSchema),
        defaultValues: initialData || {
            number: '',
            difficulty: 'easy',
            mazeSize: { width: 16, height: 16 }
        },
    })

    const handleSizeChange = (value) => {
        const selectedSize = mazeSizes.find(size => size.value === value);
        setValue('mazeSize', selectedSize.dimensions);
        setSelectedSize(value);
    }

    const handleFormSubmit = (data) => {
        console.log('Submitting data:', data);
        onSubmit(data)
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
                    <Controller
                        name="difficulty"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.difficulty && (
                        <p className="mt-1 text-sm text-destructive">{errors.difficulty.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="mazeSize" className="text-sm font-medium">
                        Maze Size
                    </Label>
                    <Controller
                        name="mazeSize"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={handleSizeChange}
                                value={selectedSize}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select maze size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mazeSizes.map((size) => (
                                        <SelectItem key={size.value} value={size.value}>
                                            {size.label} ({size.dimensions.width}x{size.dimensions.height})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.mazeSize && (
                        <p className="mt-1 text-sm text-destructive">{errors.mazeSize.message}</p>
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