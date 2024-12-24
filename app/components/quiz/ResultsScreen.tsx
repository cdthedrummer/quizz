'use client';

import { motion } from 'framer-motion';
import { QuizAnswers } from '@/app/lib/types/quiz';
import { calculateStats } from '@/app/lib/utils/calculations';

interface ResultsScreenProps {
  answers: QuizAnswers;
}

interface StatBarProps {
  label: string;
  value: number;
  index: number;
}

const StatBar = ({ label, value, index }: StatBarProps) => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className="mb-4"
  >
    <div className="flex justify-between mb-1">
      <span className="font-medium">{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="h-2 bg-blue-600 rounded-full"
      />
    </div>
  </motion.div>
);

export default function ResultsScreen({ answers }: ResultsScreenProps) {
  const stats = calculateStats(answers);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-center">Your Character Stats</h1>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <StatBar label="Strength" value={stats.strength} index={0} />
        <StatBar label="Dexterity" value={stats.dexterity} index={1} />
        <StatBar label="Constitution" value={stats.constitution} index={2} />
        <StatBar label="Intelligence" value={stats.intelligence} index={3} />
        <StatBar label="Wisdom" value={stats.wisdom} index={4} />
        <StatBar label="Charisma" value={stats.charisma} index={5} />
      </div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </motion.div>
    </motion.div>
  );
}