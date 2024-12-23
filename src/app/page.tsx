'use client';

import { useState } from 'react';
import type { QuizAnswers } from '@/app/types/quiz';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <main className="min-h-screen p-8">
      <h1>Character Quiz</h1>
    </main>
  );
}