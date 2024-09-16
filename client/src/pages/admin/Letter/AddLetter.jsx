import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useLetter } from '@/hooks/useLetter'
import { useToast } from '@/hooks/use-toast'
import { LetterForm } from '@/components/admin/Letter/LetterForm'

const AddLetter = () => {
    const { createLetter } = useLetter()
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleAddLetter = (data) => {
        createLetter(data, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Letter added successfully',
                })
                navigate({ to: '/dashboard/letter' })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to add letter: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <div className="space-y-6">
            <LetterForm onSubmit={handleAddLetter} onCancel={() => navigate({ to: '/dashboard/letter' })} />
        </div>
    )
}

export default AddLetter