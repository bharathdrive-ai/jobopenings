import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ExamSession } from '../types';

interface ExamContextValue {
  session: ExamSession | null;
  startSession: (certId: string) => ExamSession;
  endSession: () => void;
}

const ExamContext = createContext<ExamContextValue | null>(null);

export function ExamProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<ExamSession | null>(null);

  const startSession = (certId: string): ExamSession => {
    const newSession: ExamSession = {
      id: Math.random().toString(36).slice(2),
      certId,
      startTime: Date.now(),
      answers: {},
      flagged: [],
      status: 'in-progress',
    };
    setSession(newSession);
    return newSession;
  };

  const endSession = () => setSession(null);

  const value = useMemo(
    () => ({ session, startSession, endSession }),
    [session]
  );

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExamContext() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExamContext must be used within ExamProvider');
  return ctx;
}
