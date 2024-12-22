export type StatType = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface StatGain {
  stat: StatType;
  value: number;
}

export interface QuizOption {
  id: string;
  text: string;
  subtext?: string;
  statGains: StatGain[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options: QuizOption[];
}

export interface QuizStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<string, string[]>;
  stats: QuizStats;
  isComplete: boolean;
}