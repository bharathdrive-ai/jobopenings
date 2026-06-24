import React from 'react';
import type { Question } from '../../types';
import { OptionButton } from './OptionButton';
import { Badge } from '../ui/Badge';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  total: number;
  selectedOption: number;
  onSelect: (index: number) => void;
  reviewed?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  total,
  selectedOption,
  onSelect,
  reviewed,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {questionNumber} of {total}
        </span>
        <Badge label={question.domain} variant="domain" />
        <Badge
          label={question.difficulty}
          className={
            question.difficulty === 'easy'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : question.difficulty === 'medium'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }
        />
      </div>

      <p className="text-gray-900 dark:text-white text-lg leading-relaxed font-medium">
        {question.question}
      </p>

      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            index={i}
            selected={selectedOption === i}
            reviewed={reviewed}
            isCorrect={reviewed ? i === question.correctIndex : undefined}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {reviewed && (
        <div className="mt-2 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Explanation</p>
          <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
