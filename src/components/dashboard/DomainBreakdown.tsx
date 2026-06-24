import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ExamResult } from '../../types';

interface DomainBreakdownProps {
  results: ExamResult[];
}

export function DomainBreakdown({ results }: DomainBreakdownProps) {
  const domainMap: Record<string, { total: number; sum: number }> = {};
  results.forEach((r) => {
    r.domainScores.forEach((ds) => {
      if (!domainMap[ds.domain]) domainMap[ds.domain] = { total: 0, sum: 0 };
      domainMap[ds.domain].total++;
      domainMap[ds.domain].sum += ds.percentage;
    });
  });

  const data = Object.entries(domainMap)
    .map(([domain, { total, sum }]) => ({
      domain: domain.length > 20 ? domain.slice(0, 18) + '…' : domain,
      avg: Math.round(sum / total),
    }))
    .sort((a, b) => a.avg - b.avg);

  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
        Complete exams to see domain breakdown
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 40)}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.3} />
        <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
        <YAxis type="category" dataKey="domain" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={130} />
        <Tooltip
          contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8 }}
          formatter={(v: number) => [`${v}%`, 'Avg Score']}
        />
        <Bar dataKey="avg" radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.avg >= 70 ? '#6366F1' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
