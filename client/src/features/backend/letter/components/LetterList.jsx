import React from 'react';
import { useLetter } from '@/hooks/useLetter';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const LetterList = () => {
  const { getLetters, deleteLetter, isLoading, error } = useLetter();
  const { data: letters } = getLetters;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Letters</h2>
      {letters.map((letter) => (
        <Card key={letter._id} className="mb-4">
          <CardHeader>{letter.title}</CardHeader>
          <CardContent>
            <p>Date: {new Date(letter.date).toLocaleDateString()}</p>
            <p>{letter.content.substring(0, 100)}...</p>
            <Button onClick={() => deleteLetter(letter._id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};