import { StatType } from './base';

export interface Archetype {
  id: string;
  name: string;
  description: string;
  icon: string;
  primaryStat: StatType;
  secondaryStat: StatType;
  suggestedActivities: string[];
  color: string;
  quote?: string;
}

export interface ArchetypeResult {
  archetype: Archetype;
  stats: Record<StatType, number>;
  primaryStatValue: number;
  secondaryStatValue: number;
  matchPercentage: number;
}