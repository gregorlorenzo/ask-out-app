import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import QuizForm from '@/components/guest/Quiz/QuizForm';
import QuizScore from '@/components/guest/Quiz/QuizScore';
import { Card, CardContent } from '@/components/ui/card';

const GuestQuiz = () => {
  const { questions, submitAnswer, submitQuiz, quizResult, isLoading, error } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
      const newUserAnswers = [...userAnswers, { questionId: questions[currentQuestionIndex]._id, userAnswer }];
      setUserAnswers(newUserAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const result = await submitQuiz(newUserAnswers);
        setQuizCompleted(true);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  if (quizCompleted && quizResult) {
    return (
      <QuizScore
        score={quizResult.score}
        totalQuestions={quizResult.totalQuestions}
        passed={quizResult.passed}
        onRetry={handleRetry}
      />
    );
  }

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