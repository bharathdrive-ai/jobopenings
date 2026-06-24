import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { ExamResult } from '../../types';
import { formatRelativeDate, formatDuration } from '../../utils/formatters';

interface RecentActivityProps {
  history: ExamResult[];
}

export function RecentActivity({ history }: RecentActivityProps) {
  const recent = history.slice(0, 10);

  if (recent.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400 text-sm">
        No exam history yet. Start practicing to build your history!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Exam</th>
            <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Score</th>
            <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium hidden sm:table-cell">Time</th>
            <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium hidden md:table-cell">Date</th>
            <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {recent.map((r) => (
            <tr key={r.sessionId}>
              <td className="py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                {r.certName}
              </td>
              <td className="py-3">
                <span className={`font-bold ${r.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {r.score}%
                </span>
              </td>
              <td className="py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                {formatDuration(r.timeTaken)}
              </td>
              <td className="py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                {formatRelativeDate(r.date)}
              </td>
              <td className="py-3">
                {r.passed ? (
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle size={15} /> Pass
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <XCircle size={15} /> Fail
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
