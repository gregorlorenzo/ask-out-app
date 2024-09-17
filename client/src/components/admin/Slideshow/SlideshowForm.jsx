import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { DatePicker } from '@/components/common/DatePicker'
import { Textarea } from '@/components/ui/textarea'
import ImageCropModal from '@/components/common/ImageCropModal'
import { ensureAbsoluteUrl, getFileNameFromUrl } from '@/utils/helpers';

const slideshowSchema = z.object({
    date: z.date(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.instanceof(File).optional().or(z.string()),
})

export const SlideshowForm = ({ initialData, onSubmit, onCancel, mode = 'create' }) => {
    const [isImageCropOpen, setIsImageCropOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(initialData?.imageUrl || null)

    const form = useForm({
        resolver: zodResolver(slideshowSchema),
        defaultValues: {
            date: initialData?.date ? new Date(initialData.date) : new Date(),
            title: initialData?.title || '',
            description: initialData?.description || '',
            image: initialData?.imageUrl || '',
        },
    })

    useEffect(() => {
        if (initialData?.imageUrl) {
            setPreviewImage(ensureAbsoluteUrl(initialData.imageUrl));
            form.setValue('image', getFileNameFromUrl(initialData.imageUrl));
        }
    }, [initialData, form]);

    const handleSubmit = (data) => {
        const formData = new FormData();
        formData.append('date', data.date.toISOString());
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image instanceof File) {
            formData.append('image', data.image);
        } else if (typeof data.image === 'string' && data.image.startsWith(window.location.origin)) {
            // The image hasn't changed, so we don't need to upload it again
            formData.append('imageUrl', data.image);
        }
        onSubmit(formData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setIsImageCropOpen(true);
            form.setValue('image', file);
        }
    };

    const handleCropComplete = (croppedImage) => {
        form.setValue('image', croppedImage)
        setPreviewImage(URL.createObjectURL(croppedImage))
        setIsImageCropOpen(false)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="border-b">
                <CardTitle className="text-2xl font-bold">
                    {mode === 'create' ? 'Create New Slide' : 'Edit Slide'}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
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
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter slide title" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter slide description" rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <div className="flex space-x-4">
                                        <div
                                            className="w-64 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden rounded-lg"
                                            style={{
                                                backgroundImage: previewImage ? `url(${previewImage})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            {!previewImage && (
                                                <span className="text-gray-500">No image</span>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                                                onClick={() => document.getElementById('file-upload').click()}
                                            >
                                                <p className="text-sm text-gray-600">
                                                    {field.value instanceof File ? field.value.name :
                                                        (typeof field.value === 'string' ? getFileNameFromUrl(field.value) :
                                                            'Drag and drop a file or click to browse')}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">Upload a file or drag and drop it here</p>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="mt-2 hidden"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
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
                <Button type="submit" onClick={form.handleSubmit(handleSubmit)}>
                    {mode === 'create' ? 'Create Slide' : 'Update Slide'}
                </Button>
            </CardFooter>

            <ImageCropModal
                isOpen={isImageCropOpen}
                onClose={() => setIsImageCropOpen(false)}
                imageSrc={selectedImage}
                onCropComplete={handleCropComplete}
                aspectRatio={1}
            />
        </Card>
    )
}