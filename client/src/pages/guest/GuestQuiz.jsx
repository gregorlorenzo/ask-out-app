import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import QuizForm from '@/components/guest/Quiz/QuizForm';
import QuizScore from '@/components/guest/Quiz/QuizScore';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animationVariants';

const GuestQuiz = () => {
  const navigate = useNavigate();
  const { updateProgress } = useGuestProgress();
  const { questions, submitAnswer, submitQuiz, quizResult, isLoading, error } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [localQuizResult, setLocalQuizResult] = useState(null);

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center text-zinc-100"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        Loading quiz questions...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex items-center justify-center text-red-500"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        Error loading quiz: {error.message}
      </motion.div>
    );
  }

  if (questions.length === 0) {
    return (
      <motion.div
        className="flex items-center justify-center text-zinc-100"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        No quiz questions available.
      </motion.div>
    );
  }

  const handleSubmit = async (userAnswer) => {
    try {
      const newUserAnswers = [
        ...userAnswers,
        { questionId: questions[currentQuestionIndex]._id, userAnswer },
      ];
      setUserAnswers(newUserAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const result = await submitQuiz(newUserAnswers);
        setQuizCompleted(true);
        setLocalQuizResult(result);

        if (result && result.passed) {
          updateProgress({ hasCompletedQuiz: true });
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setLocalQuizResult(null);
  };

  if (quizCompleted && localQuizResult) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <QuizScore
          score={localQuizResult.score}
          totalQuestions={questions.length}
          passed={localQuizResult.passed}
          onRetry={handleRetry}
        />
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      className="flex items-center justify-center bg-zinc-900 p-4 sm:p-6 lg:p-8"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Card className="w-full max-w-2xl bg-zinc-800/80 backdrop-blur-lg border-none shadow-lg">
        <CardContent className="p-6">
          <QuizForm
            question={currentQuestion.question}
            options={currentQuestion.options}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GuestQuiz;