import React from 'react';
import { format } from 'date-fns';
import { useSlide } from '@/hooks/useSlide';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Calendar, FileText, Image as ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const SlideViewDialog = ({ slide, isOpen, setIsOpen }) => {
    const { getSlideById } = useSlide();
    const { data: slideData, isLoading } = getSlideById(slide._id);
    const formattedDate = format(new Date(slide.date), 'MMMM d, yyyy');

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-2xl font-bold text-zinc-800">{slide.title}</DialogTitle>
                    <DialogDescription className="text-zinc-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formattedDate}
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                    </div>
                ) : (
                    <ScrollArea className="max-h-[60vh] pr-4">
                        <div className="space-y-4 pt-2">
                            <div>
                                <h3 className="text-sm font-medium text-zinc-500 mb-1 flex items-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Description
                                </h3>
                                <p className="text-zinc-700">{slideData?.description || 'No description available.'}</p>
                            </div>
                            {slideData?.imageUrl && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500 mb-1 flex items-center">
                                        <ImageIcon className="w-4 h-4 mr-2" />
                                        Image
                                    </h3>
                                    <img
                                        src={slideData.imageUrl}
                                        alt={slide.title}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            {slideData?.additionalInfo && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Additional Information</h3>
                                    <p className="text-zinc-700">{slideData.additionalInfo}</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SlideViewDialog;