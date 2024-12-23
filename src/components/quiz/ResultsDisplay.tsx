import React from 'react';
import { Stats } from '@/lib/types';
import { Archetype } from '@/lib/archetypes';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ResultsDisplayProps {
  stats: Stats;
  archetype: Archetype;
}

const statEmojis: Record<string, string> = {
  strength: '💪',
  dexterity: '🎯',
  constitution: '🛡️',
  intelligence: '🧠',
  wisdom: '✨',
  charisma: '🎭',
};

const statColors: Record<string, { bg: string; text: string }> = {
  strength: { bg: 'bg-red-200', text: 'text-red-700' },
  dexterity: { bg: 'bg-green-200', text: 'text-green-700' },
  constitution: { bg: 'bg-yellow-200', text: 'text-yellow-700' },
  intelligence: { bg: 'bg-blue-200', text: 'text-blue-700' },
  wisdom: { bg: 'bg-purple-200', text: 'text-purple-700' },
  charisma: { bg: 'bg-pink-200', text: 'text-pink-700' },
};

export default function ResultsDisplay({ stats, archetype }: ResultsDisplayProps) {
  const maxStat = Math.max(...Object.values(stats).filter(Boolean));
  
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <Card className="p-6 border-2">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{archetype.icon}</div>
          <h1 className="text-3xl font-bold mb-2">
            You are a {archetype.name}!
          </h1>
          <p className="text-gray-600">{archetype.description}</p>
        </div>

        <div className="space-y-4">
          {Object.entries(stats).map(([stat, value]) => (
            <TooltipProvider key={stat}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span>{statEmojis[stat]}</span>
                        <span className="capitalize font-medium">{stat}</span>
                      </span>
                      <span className="font-bold">{value}</span>
                    </div>
                    <div className="relative h-2 w-full rounded-full bg-gray-100">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                          statColors[stat].bg
                        }`}
                        style={{
                          width: `${(value / maxStat) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your {stat} score shows {value === maxStat ? 'exceptional' : 'good'} abilities in this area</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Recommended Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {archetype.suggestedActivities.map((activity, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${statColors[archetype.primaryStat].bg} ${statColors[archetype.primaryStat].text}`}
            >
              {activity}
            </div>
          ))}
        </div>
      </Card>

      <div className="text-center text-gray-500">
        <p>Want to learn more about your character class? Check out our detailed guide!</p>
      </div>
    </div>
  );
}