import React from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useSlideshow } from '@/hooks/useSlideshow'
import { useToast } from '@/hooks/use-toast'
import { SlideshowForm } from '@/components/admin/Slideshow/SlideshowForm'

const EditSlide = () => {
    const slideId = useParams({ select: (params) => params.slideId })
    const { updateSlide, getSlideById } = useSlideshow()
    const { toast } = useToast()
    const navigate = useNavigate()

    const { data: slide, isLoading, error } = getSlideById(slideId)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!slide) return <div>No slide found</div>

    const handleEditSlide = (data) => {
        if (!slideId) {
            toast({
                title: 'Error',
                description: 'Slide ID is missing',
                variant: 'destructive',
            })
            return
        }
        updateSlide(
            { id: slideId, slideData: data },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Slide updated successfully',
                    })
                    navigate({ to: '/dashboard/slideshow' })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: `Failed to update slide: ${error.message}`,
                        variant: 'destructive',
                    })
                },
            }
        )
    }

    return (
        <div className="space-y-6">
            <SlideshowForm
                initialData={slide}
                onSubmit={handleEditSlide}
                onCancel={() => navigate({ to: '/dashboard/slideshow' })}
                mode="edit"
            />
        </div>
    )
}

export default EditSlide