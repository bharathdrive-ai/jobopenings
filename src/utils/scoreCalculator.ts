import type { Question, ExamResult, DomainScore } from '../types';

export function calculateResults(
  questions: Question[],
  answers: Record<number, number>,
  certId: string,
  certName: string,
  sessionId: string,
  startTime: number,
  endTime: number,
  passingScore: number
): ExamResult {
  const domainMap: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q, i) => {
    if (!domainMap[q.domain]) {
      domainMap[q.domain] = { correct: 0, total: 0 };
    }
    domainMap[q.domain].total++;
    if (answers[i] === q.correctIndex) {
      domainMap[q.domain].correct++;
    }
  });

  const correctAnswers = questions.filter(
    (q, i) => answers[i] === q.correctIndex
  ).length;

  const score = Math.round((correctAnswers / questions.length) * 100);

  const domainScores: DomainScore[] = Object.entries(domainMap).map(
    ([domain, stats]) => ({
      domain,
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100),
    })
  );

  return {
    sessionId,
    certId,
    certName,
    score,
    passed: score >= passingScore,
    domainScores,
    timeTaken: Math.floor((endTime - startTime) / 1000),
    date: new Date(endTime).toISOString(),
    totalQuestions: questions.length,
    correctAnswers,
  };
}
