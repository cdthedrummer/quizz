'use client';

import { motion } from 'framer-motion';
import { Answers, StatType } from '../types/quiz';
import { calculateStats } from '../utils/calculations';

interface ResultsScreenProps {
  answers: Answers;
}

const StatBar = ({ type, value, index }: { type: StatType; value: number; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="mb-4"
  >
    <div className="flex justify-between mb-1">
      <span className="capitalize font-medium">{type}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="h-full bg-blue-600 rounded-full"
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
        {(Object.entries(stats) as [StatType, number][]).map(([type, value], index) => (
          <StatBar key={type} type={type} value={value} index={index} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  );
}