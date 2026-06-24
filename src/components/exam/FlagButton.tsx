import React from 'react';
import { Flag } from 'lucide-react';

interface FlagButtonProps {
  flagged: boolean;
  onToggle: () => void;
}

export function FlagButton({ flagged, onToggle }: FlagButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        flagged
          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
      }`}
    >
      <Flag size={16} fill={flagged ? 'currentColor' : 'none'} />
      {flagged ? 'Flagged' : 'Flag for Review'}
    </button>
  );
}
