export type StatType = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export type Stats = Record<StatType, number>;

export type QuestionOption = {
  id: string;
  text: string;
  stats: Partial<Stats>;
};

export type Question = {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
};

export type QuizAnswers = {
  [questionId: string]: string[];
};

export type Archetype = {
  name: string;
  icon: string;
  description: string;
  primaryStats: StatType[];
  activities: string[];
};