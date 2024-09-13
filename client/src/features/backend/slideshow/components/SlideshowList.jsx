import React from 'react';
import { useSlideshow } from '@/hooks/useSlideshow';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SlideshowList = () => {
  const { getSlideshow, deleteSlide, isLoading, error } = useSlideshow();
  const { data: slides } = getSlideshow;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Slides</h2>
      {slides.map((slide) => (
        <Card key={slide._id} className="mb-4">
          <CardHeader>{slide.title}</CardHeader>
          <CardContent>
            <p>Date: {new Date(slide.date).toLocaleDateString()}</p>
            <p>{slide.description}</p>
            <img src={slide.imageUrl} alt={slide.title} style={{maxWidth: '200px'}} />
            <Button onClick={() => deleteSlide(slide._id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};