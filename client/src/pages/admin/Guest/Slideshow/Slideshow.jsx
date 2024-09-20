import React, { Suspense } from 'react';
import SlideshowManager from '@/components/admin/Slideshow/SlideshowManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Slideshow = () => {
    return (
        <div className="container mx-auto py-8 px-4">
          <Card className="bg-zinc-50 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-zinc-800 text-zinc-100 p-6">
              <CardTitle className="text-3xl font-bold">Slideshow Manager</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Suspense fallback={<SkeletonList />}>
                <SlideshowManager />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      );
};

export default Slideshow;