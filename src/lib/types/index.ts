export type QuizAnswers = Record<string, string[]>;

export type StatType =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type Stats = Record<StatType, number>;

export type QuestionOption = {
  id: string;
  text: string;
  stats: Stats;
};

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}