'use client';

import { motion } from 'framer-motion';
import { questions } from '../data/questions';
import { QuestionOption } from '../types/quiz';

interface QuestionCardProps {
  questionIndex: number;
  onAnswer: (questionId: number, answer: string[]) => void;
}

export default function QuestionCard({ questionIndex, onAnswer }: QuestionCardProps) {
  const question = questions[questionIndex];

  if (!question) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">{question.text}</h2>
      <div className="space-y-4">
        {question.options.map((option: QuestionOption, index: number) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onAnswer(question.id, [option.text])}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}