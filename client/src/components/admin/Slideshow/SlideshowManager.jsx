import React from 'react'
import { SlideshowTable } from './SlideshowTable'
import { Button } from '@/components/ui/button'
import { useSlideshow } from '@/hooks/useSlideshow'
import { useToast } from '@/hooks/use-toast'
import { PlusCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export const SlideshowManager = () => {
    const { deleteSlide } = useSlideshow()
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleDeleteSlide = (id) => {
        deleteSlide(id, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Slide deleted successfully',
                })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to delete slide: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    const handleEditSlide = (slide) => {
        navigate({ to: `/dashboard/slideshow/${slide._id}` })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Slideshow Manager</h2>
                <Button onClick={() => navigate({ to: '/dashboard/slideshow/add' })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Slide
                </Button>
            </div>
            <SlideshowTable
                onEdit={handleEditSlide}
                onDelete={handleDeleteSlide}
            />
        </div>
    )
}