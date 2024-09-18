import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import QuizForm from '@/components/guest/Quiz/QuizForm';
import { Card, CardContent } from '@/components/ui/card';

const GuestQuiz = () => {
  const { questions, submitAnswer, isLoading, error } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (isLoading) {
    return <div>Loading quiz questions...</div>;
  }

  if (error) {
    return <div>Error loading quiz: {error.message}</div>;
  }

  if (questions.length === 0) {
    return <div>No quiz questions available.</div>;
  }

  const handleSubmit = async (userAnswer) => {
    try {
      await submitAnswer({ questionId: questions[currentQuestionIndex]._id, userAnswer });
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log('Quiz completed');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-lg border-none shadow-lg mt-8">
      <CardContent className="p-6">
        <QuizForm
          question={currentQuestion.question}
          options={currentQuestion.options}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default GuestQuiz;