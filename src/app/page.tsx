'use client';

import { useState } from 'react';
import { Quiz } from '@/components/quiz/Quiz';
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return <Quiz />;
}
