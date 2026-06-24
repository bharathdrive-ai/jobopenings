import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface OptionButtonProps {
  label: string;
  index: number;
  selected: boolean;
  reviewed?: boolean;
  isCorrect?: boolean;
  onClick: () => void;
}

export function OptionButton({ label, index, selected, reviewed, isCorrect, onClick }: OptionButtonProps) {
  const letters = ['A', 'B', 'C', 'D'];

  const getStyle = () => {
    if (reviewed) {
      if (isCorrect) return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100';
      if (selected && !isCorrect) return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100';
      return 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 opacity-60';
    }
    if (selected) return 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100';
    return 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/10';
  };

  return (
    <button
      onClick={onClick}
      disabled={reviewed}
      className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${getStyle()}`}
    >
      <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
        selected ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}>
        {letters[index]}
      </span>
      <span className="flex-1 text-sm leading-relaxed pt-0.5">{label}</span>
      {reviewed && isCorrect && <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />}
      {reviewed && selected && !isCorrect && <XCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />}
    </button>
  );
}
