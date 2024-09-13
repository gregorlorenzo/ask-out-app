import React from 'react';
import { QuizList } from '../components/QuizList';

export const QuizPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Quiz Management</h1>
      <QuizList />
    </div>
  );
};