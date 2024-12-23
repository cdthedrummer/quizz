import { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string[]) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      <div className="grid gap-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer([option.id])}
            className="p-4 text-left rounded-lg border hover:bg-gray-100 transition-colors"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}