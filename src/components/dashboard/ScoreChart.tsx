import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { ExamResult } from '../../types';
import { formatDate } from '../../utils/formatters';

interface ScoreChartProps {
  history: ExamResult[];
}

export function ScoreChart({ history }: ScoreChartProps) {
  const data = [...history]
    .reverse()
    .slice(-10)
    .map((r) => ({
      date: formatDate(r.date),
      score: r.score,
      name: r.certName,
    }));

  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
        No exam history yet. Take your first exam to see your progress!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
        <Tooltip
          contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8 }}
          labelStyle={{ color: '#F3F4F6', fontSize: 12 }}
          itemStyle={{ color: '#818CF8' }}
          formatter={(v: number) => [`${v}%`, 'Score']}
        />
        <ReferenceLine y={70} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: '70%', fill: '#F59E0B', fontSize: 11 }} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#6366F1"
          strokeWidth={2}
          dot={{ fill: '#6366F1', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
