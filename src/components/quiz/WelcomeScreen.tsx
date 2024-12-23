'use client';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">✨ Build Your Character!</h1>
        <p className="text-gray-600">Discover your strengths and find ways to level up!</p>
        <button
          onClick={onStart}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
