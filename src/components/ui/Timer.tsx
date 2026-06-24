import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatters';

interface TimerProps {
  secondsLeft: number;
  isWarning: boolean;
  isCritical: boolean;
}

export function Timer({ secondsLeft, isWarning, isCritical }: TimerProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold transition-colors ${
        isCritical
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse-slow'
          : isWarning
          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
      }`}
    >
      <Clock size={18} />
      {formatTime(secondsLeft)}
    </div>
  );
}
