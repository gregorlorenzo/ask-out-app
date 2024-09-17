import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSlideshow } from '@/hooks/useSlideshow'
import { useToast } from '@/hooks/use-toast'
import { SlideshowForm } from '@/components/admin/Slideshow/SlideshowForm'

const AddSlide = () => {
    const { createSlide } = useSlideshow()
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleAddSlide = (data) => {
        createSlide(data, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Slide added successfully',
                })
                navigate({ to: '/dashboard/slideshow' })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to add slide: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <div className="space-y-6">
            <SlideshowForm onSubmit={handleAddSlide} onCancel={() => navigate({ to: '/dashboard/slideshow' })} />
        </div>
    )
}

export default AddSlide