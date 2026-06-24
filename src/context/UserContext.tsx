import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { UserProgress, ExamResult, Toast } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';

interface UserContextValue {
  progress: UserProgress;
  darkMode: boolean;
  toggleDarkMode: () => void;
  addResult: (result: ExamResult) => void;
  toggleBookmark: (certId: string) => void;
  isBookmarked: (certId: string) => boolean;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

const DEFAULT_PROGRESS: UserProgress = {
  examHistory: [],
  bookmarks: [],
  streakDays: 0,
  lastActive: '',
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<UserProgress>('userProgress', DEFAULT_PROGRESS);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((v) => !v);
  }, [setDarkMode]);

  const addResult = useCallback(
    (result: ExamResult) => {
      setProgress((prev) => {
        const today = new Date().toDateString();
        const lastActive = prev.lastActive;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const streakDays =
          lastActive === today
            ? prev.streakDays
            : lastActive === yesterday
            ? prev.streakDays + 1
            : 1;
        return {
          ...prev,
          examHistory: [result, ...prev.examHistory].slice(0, 100),
          streakDays,
          lastActive: today,
        };
      });
    },
    [setProgress]
  );

  const toggleBookmark = useCallback(
    (certId: string) => {
      setProgress((prev) => {
        const isBookmarked = prev.bookmarks.includes(certId);
        return {
          ...prev,
          bookmarks: isBookmarked
            ? prev.bookmarks.filter((id) => id !== certId)
            : [...prev.bookmarks, certId],
        };
      });
    },
    [setProgress]
  );

  const isBookmarked = useCallback(
    (certId: string) => progress.bookmarks.includes(certId),
    [progress.bookmarks]
  );

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      darkMode,
      toggleDarkMode,
      addResult,
      toggleBookmark,
      isBookmarked,
      toasts,
      showToast,
    }),
    [progress, darkMode, toggleDarkMode, addResult, toggleBookmark, isBookmarked, toasts, showToast]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
