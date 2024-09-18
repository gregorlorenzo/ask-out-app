import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mazeService } from '../services/mazeService';
import { useAuth } from './useAuth';
import { useState } from 'react';

export const useMaze = () => {
    const queryClient = useQueryClient();
    const { isAdmin } = useAuth();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sort, setSort] = useState('number');

    const getStages = useQuery({
        queryKey: ['mazeStages', isAdmin(), page, limit, sort],
        queryFn: () => mazeService.getStages(isAdmin(), page, limit, sort),
        keepPreviousData: true,
    });

    const getStageById = (id) => useQuery({
        queryKey: ['mazeStage', id],
        queryFn: () => mazeService.getStageById(id),
    });

    const createStageMutation = useMutation({
        mutationFn: mazeService.createStage,
        onSuccess: () => {
            queryClient.invalidateQueries(['mazeStages', isAdmin(), page, limit]);
        },
    });

    const updateStageMutation = useMutation({
        mutationFn: ({ id, stageData }) => mazeService.updateStage(id, stageData),
        onSuccess: () => {
            queryClient.invalidateQueries(['mazeStages', isAdmin(), page, limit]);
        },
    });

    const deleteStageMutation = useMutation({
        mutationFn: mazeService.deleteStage,
        onSuccess: () => {
            queryClient.invalidateQueries(['mazeStages', isAdmin(), page, limit]);
        },
    });

    return {
        stages: getStages.data?.data || [],
        totalPages: getStages.data?.totalPages || 0,
        currentPage: getStages.data?.currentPage || page,
        totalItems: getStages.data?.totalItems || 0,
        setPage,
        setLimit,
        setSort,
        getStageById,
        createStage: createStageMutation.mutate,
        updateStage: updateStageMutation.mutate,
        deleteStage: deleteStageMutation.mutate,
        isLoading: getStages.isLoading || createStageMutation.isLoading || updateStageMutation.isLoading || deleteStageMutation.isLoading,
        error: getStages.error || createStageMutation.error || updateStageMutation.error || deleteStageMutation.error,
        isAdmin: isAdmin(),
    };
};