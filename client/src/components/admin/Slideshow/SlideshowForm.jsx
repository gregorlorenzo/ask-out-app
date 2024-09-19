import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { SlideList } from './SlideList';
import { SlideshowList } from './SlideshowList';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SlideshowForm = ({
    slideshow,
    setSlideshow,
    availableSlides,
    setAvailableSlides,
    slidesLoading,
    slideshowLoading,
    handleSave,
    onDragEnd
}) => {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Slideshow Manager</CardTitle>
            </CardHeader>
            <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Tabs defaultValue="split" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="split">Split View</TabsTrigger>
                            <TabsTrigger value="full">Full View</TabsTrigger>
                        </TabsList>
                        <TabsContent value="split" className="space-y-4">
                            <div className="flex gap-4">
                                <SlideList slides={availableSlides} isLoading={slidesLoading} />
                                <SlideshowList
                                    slideshow={slideshow}
                                    setSlideshow={setSlideshow}
                                    isLoading={slideshowLoading}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="full" className="space-y-4">
                            <SlideshowList
                                slideshow={slideshow}
                                setSlideshow={setSlideshow}
                                isLoading={slideshowLoading}
                                fullWidth
                            />
                            <SlideList slides={availableSlides} isLoading={slidesLoading} fullWidth />
                        </TabsContent>
                    </Tabs>
                </DragDropContext>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleSave}
                    className="w-full"
                    disabled={slideshowLoading}
                >
                    {slideshowLoading ? 'Saving...' : 'Save Slideshow'}
                </Button>
            </CardFooter>
        </Card>
    );
};