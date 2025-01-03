export type StatType = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface Stats {
  [key in StatType]?: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  stats: Stats;
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}

export type QuizAnswers = {
  [questionId: string]: string[];
};

export interface QuizState {
  started: boolean;
  questionIndex: number;
  answers: QuizAnswers;
}