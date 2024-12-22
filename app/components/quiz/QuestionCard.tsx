import { QuizQuestion, QuizOption } from '@/types/quiz.types';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswers: string[];
  onSelect: (optionId: string) => void;
  isTransitioning: boolean;
}

export function QuestionCard({
  question,
  selectedAnswers,
  onSelect,
  isTransitioning
}: QuestionCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 transition-opacity duration-300
      ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            isSelected={selectedAnswers.includes(option.id)}
            onSelect={() => onSelect(option.id)}
            selectionType={question.type}
          />
        ))}
      </div>
    </div>
  );
}