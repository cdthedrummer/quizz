'use client';

import { useState } from 'react';
import { Quiz } from '@/components/quiz/Quiz';
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';

export default function Home() {
  const [started, setStarted] = useState(false);
  return started ? <Quiz /> : <WelcomeScreen onStart={() => setStarted(true)} />;
}
