'use client';

import type { Question } from '@/lib/types';

type QuestionCardProps = {
  question: Question;
  selectedAnswers: string[];
  onSelect: (optionId: string) => void;
};

export function QuestionCard({
  question,
  selectedAnswers,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all
              ${selectedAnswers.includes(option.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
              } text-left`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 shrink-0
                  ${question.type === 'multiple' ? 'rounded' : 'rounded-full'}
                  border-2 flex items-center justify-center
                  ${selectedAnswers.includes(option.id)
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                  }`}
              >
                {selectedAnswers.includes(option.id) && '✓'}
              </div>
              <span className="text-lg">{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
