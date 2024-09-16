import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import TiptapEditor from '@/components/common/TipTapEditor'
import { DatePicker } from '@/components/common/DatePicker'

const letterSchema = z.object({
    date: z.date(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
})

export const LetterForm = ({ initialData, onSubmit, onCancel }) => {
    console.log('Initial data received:', initialData) // Add this line

    const form = useForm({
        resolver: zodResolver(letterSchema),
        defaultValues: {
            date: initialData?.date ? new Date(initialData.date) : new Date(),
            title: initialData?.title || '',
            content: initialData?.content || '',
        },
    })

    console.log('Form values after initialization:', form.getValues()) // Add this line

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="border-b">
                <CardTitle className="text-2xl font-bold">Create New Letter</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value}
                                                setDate={(date) => field.onChange(date)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter letter title" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <div className="bg-white border rounded-md overflow-hidden">
                                            <TiptapEditor
                                                content={field.value}
                                                onChange={field.onChange}
                                                className="min-h-[400px] p-4"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4 border-t pt-6">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Save Letter
                </Button>
            </CardFooter>
        </Card>
    )
}