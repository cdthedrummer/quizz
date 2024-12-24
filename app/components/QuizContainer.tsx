'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Answers } from '../types/quiz';
import QuestionCard from './QuestionCard';
import ResultsScreen from './ResultsScreen';

export default function QuizContainer() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswer = (questionId: number, answer: string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setQuestionIndex(prev => prev + 1);
  };

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold">Discover Your Character</h1>
        <p className="text-lg max-w-md">
          Find out your strengths and get personalized recommendations
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {questionIndex < 12 ? (
        <QuestionCard
          questionIndex={questionIndex}
          onAnswer={handleAnswer}
        />
      ) : (
        <ResultsScreen answers={answers} />
      )}
    </div>
  );
}