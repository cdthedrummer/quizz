export type StatType =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type Stats = {
  [K in StatType]?: number;
};

export type QuestionOption = {
  id: string;
  text: string;
  stats: Stats;
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
