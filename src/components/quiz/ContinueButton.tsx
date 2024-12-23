'use client';

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ContinueButton({ onClick, disabled = false }: ContinueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 bg-blue-500 text-white rounded-xl font-medium
        transition-all duration-300 ease-in-out
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]'}`}
    >
      Continue
    </button>
  );
}