import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSlide } from '@/hooks/useSlide'
import { useToast } from '@/hooks/use-toast'
import { SlideForm } from '@/components/admin/Slide/SlideForm'

const AddSlide = () => {
    const { createSlide } = useSlide()
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleAddSlide = (data) => {
        createSlide(data, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Slide added successfully',
                })
                navigate({ to: '/dashboard/slide' })
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
            <SlideForm onSubmit={handleAddSlide} onCancel={() => navigate({ to: '/dashboard/slide' })} />
        </div>
    )
}

export default AddSlide