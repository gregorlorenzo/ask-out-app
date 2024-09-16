import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
            </div>
        </div>
    );
};

export const SkeletonDashboard = () => {
    return (
        <div className="space-y-4 p-4 bg-zinc-200 rounded-lg">
            <Skeleton className="h-8 w-1/4 bg-zinc-300" />
            <Skeleton className="h-4 w-3/4 bg-zinc-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-zinc-100 p-4 rounded-lg">
                        <Skeleton className="h-6 w-3/4 bg-zinc-300 mb-2" />
                        <Skeleton className="h-4 w-full bg-zinc-300" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SkeletonList = () => {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};