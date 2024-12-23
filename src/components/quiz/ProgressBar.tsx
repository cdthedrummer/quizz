'use client';

interface ProgressBarProps {
  progress: number;
  showCheckpoint?: boolean;
}

export function ProgressBar({ progress, showCheckpoint = false }: ProgressBarProps) {
  return (
    <div className="relative">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-12">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
      {showCheckpoint && progress > 0 && progress < 100 && (
        <div className="absolute top-full mt-2 text-sm text-gray-600 w-full text-center">
          {Math.round(progress)}% Complete
        </div>
      )}
    </div>
  );
}