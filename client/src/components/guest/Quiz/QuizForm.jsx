import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { slideUp } from '@/utils/animationVariants';

const QuizForm = ({ question, options, onSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setSelectedAnswer(null);
        setIsSubmitted(false);
    }, [question]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedAnswer !== null) {
            setIsSubmitted(true);
            onSubmit(selectedAnswer);
        }
    };

    return (
        <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
            <CardHeader className="pb-1">
                <CardTitle className="text-2xl font-bold text-zinc-100 text-center">{question}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options.map((option, index) => (
                            <motion.div
                                key={index}
                                variants={slideUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card
                                    className={`cursor-pointer transition-all ${selectedAnswer === index
                                            ? 'bg-zinc-700 ring-2 ring-zinc-100'
                                            : 'bg-zinc-800 hover:bg-zinc-700'
                                        }`}
                                    onClick={() => setSelectedAnswer(index)}
                                    aria-pressed={selectedAnswer === index}
                                >
                                    <CardContent className="p-4">
                                        <p className="text-center text-zinc-100 font-semibold">{option}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-2">
                    <Button
                        type="submit"
                        className={`w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 ${isSubmitted ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        disabled={selectedAnswer === null || isSubmitted}
                        aria-label={isSubmitted ? "Answer Submitted" : "Submit Answer"}
                    >
                        {isSubmitted ? "Submitted" : "Submit Answer"}
                    </Button>
                </CardFooter>
            </form>
        </motion.div>
    );
};

export default QuizForm;
