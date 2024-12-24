import { Stats, Answers, Question, StatType } from '../types/quiz';
import { questions } from '../data/questions';

export function calculateStats(answers: Answers): Stats {
  const initialStats: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  for (const [questionId, answerTexts] of Object.entries(answers)) {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (!question) continue;

    for (const answerText of answerTexts) {
      const option = question.options.find(opt => opt.text === answerText);
      if (!option) continue;

      for (const stat of option.stats) {
        initialStats[stat.type] += stat.value;
      }
    }
  }

  return initialStats;
}