'use client';

import QuizContainer from '@/components/quiz/QuizContainer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <QuizContainer />
    </main>
  );
}