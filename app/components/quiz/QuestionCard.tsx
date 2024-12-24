'use client';

import { Question } from '@/app/lib/types';
import { questions } from '@/app/lib/data/questions';

interface QuestionCardProps {
  questionIndex: number;
  onAnswer: (questionId: number, answer: string[]) => void;
  isTransitioning: boolean;
}

interface QuestionOption {
  text: string;
  stats: Array<{
    type: string;
    value: number;
  }>;
}

export default function QuestionCard({
  questionIndex,
  onAnswer,
  isTransitioning
}: QuestionCardProps) {
  const question = questions[questionIndex];

  return (
    <div
      className={`transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">{question.text}</h2>
      <div className="space-y-4">
        {question.options.map((option: QuestionOption, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(question.id, [option.text])}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}