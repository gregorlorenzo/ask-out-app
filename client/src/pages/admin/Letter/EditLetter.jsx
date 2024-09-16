import React from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useLetter } from '@/hooks/useLetter'
import { useToast } from '@/hooks/use-toast'
import { LetterForm } from '@/components/admin/Letter/LetterForm'

const EditLetter = () => {
    const { letterId } = useParams()
    const { updateLetter, getLetterById } = useLetter()
    const { toast } = useToast()
    const navigate = useNavigate()

    const { data: letter, isLoading, error } = getLetterById(letterId)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!letter) return <div>No letter found</div>

    console.log('Letter data:', letter) // Add this line to log the letter data

    const handleEditLetter = (data) => {
        if (!letterId) {
            toast({
                title: 'Error',
                description: 'Letter ID is missing',
                variant: 'destructive',
            })
            return
        }
        updateLetter(
            { id: letterId, letterData: data },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Letter updated successfully',
                    })
                    navigate({ to: '/dashboard/letter' })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: `Failed to update letter: ${error.message}`,
                        variant: 'destructive',
                    })
                },
            }
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Edit Letter</h2>
            <LetterForm
                initialData={letter}
                onSubmit={handleEditLetter}
                onCancel={() => navigate({ to: '/dashboard/letter' })}
            />
        </div>
    )
}

export default EditLetter