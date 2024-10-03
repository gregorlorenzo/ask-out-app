import React from 'react';
import { LetterTable } from './LetterTable';
import { Button } from '@/components/ui/button';
import { useLetter } from '@/hooks/useLetter';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export const LetterManager = () => {
    const { deleteLetter } = useLetter();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleDeleteLetter = (id) => {
        deleteLetter(id, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Letter deleted successfully',
                });
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to delete letter: ${error.message}`,
                    variant: 'destructive',
                });
            },
        });
    };

    const handleEditLetter = (letter) => {
        navigate({ to: `/dashboard/letter/${letter._id}` });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Letter Manager</h2>
                <Button onClick={() => navigate({ to: '/dashboard/letter/add' })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Letter
                </Button>
            </div>
            <LetterTable
                onEdit={handleEditLetter}
                onDelete={handleDeleteLetter}
            />
        </div>
    );
};
