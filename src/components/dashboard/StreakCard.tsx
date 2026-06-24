import React from 'react';
import { Flame, Trophy, Clock, Target } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';
import type { UserProgress } from '../../types';

interface StreakCardProps {
  progress: UserProgress;
}

export function StreakCard({ progress }: StreakCardProps) {
  const history = progress.examHistory;
  const avgScore = history.length
    ? Math.round(history.reduce((s, r) => s + r.score, 0) / history.length)
    : 0;
  const bestScore = history.length ? Math.max(...history.map((r) => r.score)) : 0;
  const totalTime = history.reduce((s, r) => s + r.timeTaken, 0);

  const stats = [
    { label: 'Exams Taken', value: history.length, icon: <Target size={20} className="text-indigo-500" /> },
    { label: 'Avg Score', value: `${avgScore}%`, icon: <Trophy size={20} className="text-amber-500" /> },
    { label: 'Best Score', value: `${bestScore}%`, icon: <Trophy size={20} className="text-green-500" /> },
    { label: 'Total Time', value: formatDuration(totalTime), icon: <Clock size={20} className="text-blue-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-4 text-white flex items-center gap-3">
        <Flame size={32} className="text-amber-400 flex-shrink-0" />
        <div>
          <div className="text-3xl font-bold">{progress.streakDays}</div>
          <div className="text-xs text-indigo-200">Day Streak</div>
        </div>
      </div>
      {stats.map((s, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="mb-1">{s.icon}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
