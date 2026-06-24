import { useState, useCallback } from 'react';
import type { Question } from '../types';

export function useExam(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const current = questions[currentIndex];
  const totalAnswered = Object.keys(answers).length;
  const totalFlagged = flagged.length;
  const progress = Math.round((totalAnswered / questions.length) * 100);

  const answerQuestion = useCallback((optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  }, [currentIndex]);

  const toggleFlag = useCallback(() => {
    setFlagged((prev) =>
      prev.includes(currentIndex)
        ? prev.filter((i) => i !== currentIndex)
        : [...prev, currentIndex]
    );
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) setCurrentIndex(index);
  }, [questions.length]);

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  }, [currentIndex, questions.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const isFlagged = flagged.includes(currentIndex);
  const isAnswered = currentIndex in answers;
  const selectedOption = answers[currentIndex] ?? -1;

  return {
    currentIndex,
    current,
    answers,
    flagged,
    showSubmitModal,
    setShowSubmitModal,
    totalAnswered,
    totalFlagged,
    progress,
    answerQuestion,
    toggleFlag,
    goTo,
    goNext,
    goPrev,
    isFlagged,
    isAnswered,
    selectedOption,
  };
}
