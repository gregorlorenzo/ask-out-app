import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

const QuizScore = ({ score, totalQuestions, passed, onRetry }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (passed) {
            const timer = setTimeout(() => {
                navigate({ to: '/guest/maze' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [passed, navigate]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-md mx-auto bg-white/20 backdrop-blur-lg border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white text-center">Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-4xl font-bold text-white mb-4">{score}%</p>
                    <p className="text-xl text-white mb-2">
                        You got {Math.round((score / 100) * totalQuestions)} out of {totalQuestions} questions correct.
                    </p>
                    <p className="text-2xl font-semibold text-white mb-6">
                        {passed ? "Congratulations! You passed!" : "Sorry, you didn't pass. Try again!"}
                    </p>
                    {passed ? (
                        <p className="text-white">Redirecting to maze in 3 seconds...</p>
                    ) : (
                        <Button
                            onClick={onRetry}
                            className="w-full bg-white/20 hover:bg-white/40 text-white border-2 border-white"
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