interface ProgressProps {
  current: number;
  total: number;
}

export function Progress({ current, total }: ProgressProps) {
  const progress = ((current) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-blue-600 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full bg-blue-100 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}