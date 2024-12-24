import { QuizAnswers, Stats, Question } from '../types/quiz';
import { questions } from '../data/questions';

export function calculateStats(answers: QuizAnswers): Stats {
  const initialStats: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  return Object.entries(answers).reduce((stats, [questionId, answerTexts]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (!question) return stats;

    answerTexts.forEach(answerText => {
      const option = question.options.find(opt => opt.text === answerText);
      if (!option) return;

      option.stats.forEach(stat => {
        const statKey = stat.type as keyof Stats;
        stats[statKey] += stat.value;
      });
    });

    return stats;
  }, { ...initialStats });
}