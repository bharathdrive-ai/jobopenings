import React from 'react';
import { getLevelColor } from '../../utils/formatters';

interface BadgeProps {
  label: string;
  variant?: 'level' | 'domain' | 'default';
  className?: string;
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const baseClass = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variantClass =
    variant === 'level'
      ? getLevelColor(label)
      : variant === 'domain'
      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

  return (
    <span className={`${baseClass} ${variantClass} ${className}`}>{label}</span>
  );
}
