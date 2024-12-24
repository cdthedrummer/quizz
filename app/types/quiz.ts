export type StatType = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface Stats {
  [key in StatType]: number;
}

export interface QuestionOption {
  text: string;
  stats: Array<{ type: StatType; value: number; }>;
}

export interface Question {
  id: number;
  text: string;
  type: 'select-one' | 'select-all' | 'scale';
  options: QuestionOption[];
}

export type Answers = Record<number, string[]>;