export type StatType = 'strength' | 'intelligence' | 'wisdom' | 'dexterity' | 'charisma' | 'constitution';

export interface Stat {
  type: StatType;
  value: number;
}

export interface QuestionOption {
  text: string;
  stats: Stat[];
}

export interface Question {
  id: number;
  text: string;
  type: 'select-one' | 'select-all' | 'scale';
  options: QuestionOption[];
}

export interface QuizAnswers {
  [questionId: number]: string[];
}

export interface Stats {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

export interface QuizState {
  started: boolean;
  questionIndex: number;
  answers: QuizAnswers;
  isTransitioning: boolean;
}