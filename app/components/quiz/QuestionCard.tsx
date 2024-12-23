'use client';

import { QuestionType, OptionType } from '@/app/types';

interface QuestionCardProps {
  question: QuestionType;
  selectedAnswers: string[];
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({ 
  question, 
  selectedAnswers, 
  onSelect 
}: QuestionCardProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{question.text}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all
              ${selectedAnswers.includes(option.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
              } text-left group`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 mr-3
                ${question.type === 'multiple' ? 'rounded' : 'rounded-full'}
                border-2 flex items-center justify-center
                ${selectedAnswers.includes(option.id)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300'
                }`}
              >
                {selectedAnswers.includes(option.id) && '✓'}
              </div>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}