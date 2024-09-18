import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

const QuizForm = ({ question, options, onSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setSelectedAnswer("");
        setIsSubmitted(false);
    }, [question]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        onSubmit(selectedAnswer);
    };

    return (
        <>
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-white text-center">{question}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                        {options.map((option, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card
                                    className={`cursor-pointer transition-all ${selectedAnswer === index.toString()
                                            ? 'bg-white/40 ring-2 ring-white'
                                            : 'bg-white/10 hover:bg-white/30'
                                        }`}
                                    onClick={() => setSelectedAnswer(index.toString())}
                                >
                                    <CardContent className="p-4">
                                        <p className="text-center text-white font-semibold">{option}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-4">
                    <Button
                        type="submit"
                        className="w-full bg-white/20 hover:bg-white/40 text-white border-2 border-white"
                        disabled={!selectedAnswer || isSubmitted}
                    >
                        {isSubmitted ? "Submitted" : "Submit Answer"}
                    </Button>
                </CardFooter>
            </form>
        </>
    );
};

export default QuizForm;