import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { fadeIn } from '@/utils/animationVariants';

const QuizScore = ({ score, totalQuestions, passed, onRetry }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (passed) {
            const timer = setTimeout(() => {
                navigate({ to: '/guest/slideshow' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [passed, navigate]);

    return (
        <motion.div
            className="flex items-center justify-center bg-zinc-900 p-4 sm:p-6 lg:p-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <Card className="w-full max-w-md bg-zinc-800/80 backdrop-blur-lg border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-zinc-100 text-center">Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-4xl font-bold text-zinc-100 mb-4">{score}%</p>
                    <p className="text-xl text-zinc-300 mb-2">
                        You got {Math.round((score / 100) * totalQuestions)} out of {totalQuestions} questions correct.
                    </p>
                    <p className="text-2xl font-semibold text-zinc-100 mb-4">
                        {passed ? "Congratulations! You passed!" : "Sorry, you didn't pass. Try again!"}
                    </p>
                    {passed ? (
                        <p className="text-zinc-300">Redirecting to the next stage...</p>
                    ) : (
                        <Button
                            onClick={onRetry}
                            className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600"
                            aria-label="Retry Quiz"
                        >
                            Retry Quiz
                        </Button>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default QuizScore;
