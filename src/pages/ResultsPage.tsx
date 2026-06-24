import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw, Library, Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '../components/ui/Button';
import { QuestionCard } from '../components/exam/QuestionCard';
import type { ExamResult, Question } from '../types';
import { formatDuration } from '../utils/formatters';

interface LocationState {
  result: ExamResult;
  questions: Question[];
  answers: Record<number, number>;
}

export function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  const state = location.state as LocationState | null;

  if (!state) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Results not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Session {sessionId} could not be loaded.</p>
        <Button onClick={() => navigate('/catalog')}>Back to Catalog</Button>
      </div>
    );
  }

  const { result, questions, answers } = state;

  const filteredQuestions = questions.filter((q, i) => {
    const correct = answers[i] === q.correctIndex;
    if (reviewFilter === 'wrong') return !correct;
    if (reviewFilter === 'correct') return correct;
    return true;
  });

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (result.score / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Banner */}
      <div className={`rounded-2xl p-8 mb-8 text-center ${
        result.passed
          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
          : 'bg-gradient-to-br from-red-500 to-rose-600 text-white'
      }`}>
        <div className="flex justify-center mb-4">
          {result.passed ? (
            <Trophy size={48} className="text-yellow-300" />
          ) : (
            <XCircle size={48} className="text-red-200" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {result.passed ? 'Congratulations! You Passed! 🎉' : 'Keep Practicing — You Got This!'}
        </h1>
        <p className="text-lg opacity-90">{result.certName}</p>
      </div>

      {/* Score + stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Gauge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" className="dark:stroke-gray-700" />
            <circle
              cx="64" cy="64" r="54" fill="none"
              stroke={result.passed ? '#10b981' : '#ef4444'}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 64 64)"
            />
            <text x="64" y="60" textAnchor="middle" className="fill-gray-900 dark:fill-white" fontSize="24" fontWeight="bold">
              {result.score}%
            </text>
            <text x="64" y="80" textAnchor="middle" className="fill-gray-500" fontSize="11">
              Score
            </text>
          </svg>
          <div className={`mt-2 font-bold text-lg ${result.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {result.passed ? '✓ PASSED' : '✗ FAILED'}
          </div>
        </div>

        {/* Stats */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: 'Correct Answers', value: `${result.correctAnswers}/${result.totalQuestions}`, color: 'text-green-600 dark:text-green-400' },
            { label: 'Time Taken', value: formatDuration(result.timeTaken), color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Questions Wrong', value: result.totalQuestions - result.correctAnswers, color: 'text-red-600 dark:text-red-400' },
            { label: 'Pass Mark', value: `${result.passed ? '✓ Met' : '✗ Not Met'}`, color: result.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain scores */}
      {result.domainScores.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Domain Score Breakdown</h2>
          <ResponsiveContainer width="100%" height={Math.max(150, result.domainScores.length * 45)}>
            <BarChart data={result.domainScores} layout="vertical" margin={{ left: 10, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.3} />
              <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis type="category" dataKey="domain" tick={{ fontSize: 10, fill: '#9CA3AF' }} width={140} />
              <Tooltip
                contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8 }}
                formatter={(v: number, _: string, props: { payload?: { correct: number; total: number } }) => [
                  `${v}% (${props.payload?.correct}/${props.payload?.total})`,
                  'Score',
                ]}
              />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]} maxBarSize={24}>
                {result.domainScores.map((entry, i) => (
                  <Cell key={i} fill={entry.percentage >= 70 ? '#6366F1' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Question review */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <button
          className="w-full flex items-center justify-between"
          onClick={() => setShowReview((v) => !v)}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Review All Questions</h2>
          {showReview ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </button>

        {showReview && (
          <div className="mt-6">
            <div className="flex gap-2 mb-6 flex-wrap">
              {(['all', 'wrong', 'correct'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setReviewFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    reviewFilter === f
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {f === 'all' ? `All (${questions.length})` : f === 'wrong' ? `Wrong (${questions.filter((q, i) => answers[i] !== q.correctIndex).length})` : `Correct (${result.correctAnswers})`}
                </button>
              ))}
            </div>
            <div className="space-y-8">
              {filteredQuestions.map((q) => {
                const origIndex = questions.indexOf(q);
                return (
                  <div key={q.id} className="border-b border-gray-100 dark:border-gray-700 pb-8 last:border-0">
                    <div className="flex items-center gap-2 mb-3">
                      {answers[origIndex] === q.correctIndex ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <XCircle size={16} className="text-red-500" />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">Question {origIndex + 1}</span>
                    </div>
                    <QuestionCard
                      question={q}
                      questionNumber={origIndex + 1}
                      total={questions.length}
                      selectedOption={answers[origIndex] ?? -1}
                      onSelect={() => {}}
                      reviewed
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="flex-1" onClick={() => navigate(`/exam/${result.certId}`)}>
          <RefreshCw size={18} /> Retake Exam
        </Button>
        <Button variant="secondary" size="lg" className="flex-1" onClick={() => navigate('/catalog')}>
          <Library size={18} /> Back to Catalog
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
          View Dashboard
        </Button>
      </div>
    </div>
  );
}
