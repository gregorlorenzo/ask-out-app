import React, { useState } from 'react'
import { MazeTable } from './MazeTable'
import { MazeDialog } from './MazeDialog'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { useMaze } from '@/hooks/useMaze'
import { useToast } from '@/hooks/use-toast'
import { PlusCircle } from 'lucide-react'

export const MazeManager = () => {
    const { createStage, updateStage, deleteStage } = useMaze()
    const { toast } = useToast()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentStage, setCurrentStage] = useState(null)

    const handleAddStage = (data) => {
        createStage(data, {
            onSuccess: () => {
                setIsAddDialogOpen(false)
                toast({
                    title: 'Success',
                    description: 'Stage added successfully',
                })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to add stage: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    const handleEditStage = (data) => {
        updateStage(
            { id: currentStage._id, stageData: data },
            {
                onSuccess: () => {
                    setIsEditDialogOpen(false)
                    toast({
                        title: 'Success',
                        description: 'Stage updated successfully',
                    })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: `Failed to update stage: ${error.message}`,
                        variant: 'destructive',
                    })
                },
            }
        )
    }

    const handleDeleteStage = () => {
        deleteStage(currentStage._id, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false)
                toast({
                    title: 'Success',
                    description: 'Stage deleted successfully',
                })
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: `Failed to delete stage: ${error.message}`,
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Maze Manager</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Stage
                </Button>
            </div>
            <MazeTable
                onEdit={(stage) => {
                    setCurrentStage(stage)
                    setIsEditDialogOpen(true)
                }}
                onDelete={(id) => {
                    setCurrentStage({ _id: id })
                    setIsDeleteDialogOpen(true)
                }}
            />
            <MazeDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSubmit={handleAddStage}
                title="Add New Stage"
            />
            <MazeDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSubmit={handleEditStage}
                initialData={currentStage}
                title="Edit Stage"
            />
            <Dialog open={isDeleteDialogOpen} onOpenChange={() => setIsDeleteDialogOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Stage</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this stage? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteStage}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}