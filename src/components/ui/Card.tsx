import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${hover ? 'hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
