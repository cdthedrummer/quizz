'use client';

type ProgressBarProps = {
  value: number;
  showLabel?: boolean;
};

export function ProgressBar({ value, showLabel = false }: ProgressBarProps) {
  const progress = Math.min(Math.max(value, 0), 100);
  return (
    <div className="w-full space-y-2">
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-500 text-center">
          {Math.round(progress)}% Complete
        </p>
      )}
    </div>
  );
}
