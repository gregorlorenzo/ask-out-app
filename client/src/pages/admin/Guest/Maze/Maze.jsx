import React, { Suspense } from 'react';
import { MazeManager } from '@/components/admin/Maze/MazeManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Maze = () => {
    return (
        <div className="container mx-auto py-8">
            <Suspense fallback={<SkeletonList />}>
                <MazeManager />
            </Suspense>
        </div>
    );
};

export default Maze;