'use client';

import { motion } from 'framer-motion';
import { questions } from '@/app/lib/data/questions';
import { QuestionOption } from '@/app/lib/types/quiz';

interface QuestionCardProps {
  questionIndex: number;
  onAnswer: (questionId: number, answer: string[]) => void;
  isTransitioning: boolean;
}

export default function QuestionCard({
  questionIndex,
  onAnswer,
  isTransitioning
}: QuestionCardProps) {
  const question = questions[questionIndex];

  if (!question) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6">{question.text}</h2>
      <div className="space-y-4">
        {question.options.map((option: QuestionOption, index: number) => (
          <motion.button
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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