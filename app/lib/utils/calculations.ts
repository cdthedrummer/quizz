import { QuizAnswers, Stats } from '@/lib/types';
import { questions } from '@/lib/data/questions';

export function calculateStats(answers: QuizAnswers): Stats {
  const initialStats: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  // Calculate raw stats
  const rawStats = Object.entries(answers).reduce((stats, [questionId, answerTexts]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (!question) return stats;

    answerTexts.forEach(answerText => {
      const option = question.options.find(opt => opt.text === answerText);
      if (!option) return;

      option.stats.forEach(stat => {
        stats[stat.type as keyof Stats] += stat.value;
      });
    });

    return stats;
  }, { ...initialStats });

  // Normalize stats to percentages
  const maxPossibleValue = 100; // Adjust based on your scoring system
  return Object.entries(rawStats).reduce((normalized, [stat, value]) => ({
    ...normalized,
    [stat]: Math.round((value / maxPossibleValue) * 100)
  }), {} as Stats);
}