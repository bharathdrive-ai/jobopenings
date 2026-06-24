import React from 'react';
import { Flag } from 'lucide-react';

interface NavigationPanelProps {
  total: number;
  currentIndex: number;
  answers: Record<number, number>;
  flagged: number[];
  onGoTo: (index: number) => void;
}

export function NavigationPanel({ total, currentIndex, answers, flagged, onGoTo }: NavigationPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Questions</h3>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = i in answers;
          const isFlagged = flagged.includes(i);
          const isCurrent = i === currentIndex;
          return (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className={`w-full aspect-square rounded-lg text-xs font-semibold transition-all flex items-center justify-center relative ${
                isCurrent
                  ? 'ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-gray-800'
                  : ''
              } ${
                isAnswered
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {i + 1}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-indigo-600" />
          <span>Answered ({Object.keys(answers).length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-600" />
          <span>Not answered ({total - Object.keys(answers).length})</span>
        </div>
        <div className="flex items-center gap-2">
          <Flag size={12} className="text-amber-500" />
          <span>Flagged ({flagged.length})</span>
        </div>
      </div>
    </div>
  );
}
