import { useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Timer } from '../components/ui/Timer';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { QuestionCard } from '../components/exam/QuestionCard';
import { NavigationPanel } from '../components/exam/NavigationPanel';
import { FlagButton } from '../components/exam/FlagButton';
import { useExam } from '../hooks/useExam';
import { useTimer } from '../hooks/useTimer';
import { useUser } from '../context/UserContext';
import { calculateResults } from '../utils/scoreCalculator';
import { getQuestionsForCert } from '../data/questions/index';
import certifications from '../data/certifications.json';
import type { Certification } from '../types';

const certs = certifications as Certification[];

export function ExamPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addResult, showToast } = useUser();
  const [startTime] = useState(Date.now());

  const cert = certs.find((c) => c.id === id);
  const questions = cert ? getQuestionsForCert(cert.id, cert.domain) : [];

  const exam = useExam(questions);
  const timer = useTimer({
    initialSeconds: (cert?.timeMinutes ?? 60) * 60,
    onExpire: handleSubmit,
  });

  const sessionId = useRef(Math.random().toString(36).slice(2)).current;

  function handleSubmit() {
    if (!cert || questions.length === 0) return;
    const result = calculateResults(
      questions,
      exam.answers,
      cert.id,
      `${cert.code} — ${cert.name}`,
      sessionId,
      startTime,
      Date.now(),
      cert.passingScore || 70
    );
    addResult(result);
    showToast('Exam submitted! Reviewing your results…', 'success');
    navigate(`/results/${sessionId}`, { state: { result, questions, answers: exam.answers } });
  }

  const confirmSubmit = useCallback(() => {
    timer.pause();
    exam.setShowSubmitModal(true);
  }, [timer, exam]);

  if (!cert || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {!cert ? 'Certification not found' : 'No practice questions available yet'}
        </h2>
        <Button onClick={() => navigate('/catalog')}>Back to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <div className="sticky top-16 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
              {cert.code} — {cert.name}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <ProgressBar value={exam.totalAnswered} max={questions.length} className="w-32" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {exam.totalAnswered}/{questions.length} answered
              </span>
            </div>
          </div>
          <Timer
            secondsLeft={timer.secondsLeft}
            isWarning={timer.isWarning}
            isCritical={timer.isCritical}
          />
          <Button size="sm" onClick={confirmSubmit}>
            <Send size={14} /> Submit
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* Left nav panel */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-36">
            <NavigationPanel
              total={questions.length}
              currentIndex={exam.currentIndex}
              answers={exam.answers}
              flagged={exam.flagged}
              onGoTo={exam.goTo}
            />
          </div>
        </aside>

        {/* Question area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <QuestionCard
              question={exam.current}
              questionNumber={exam.currentIndex + 1}
              total={questions.length}
              selectedOption={exam.selectedOption}
              onSelect={exam.answerQuestion}
            />
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              variant="secondary"
              onClick={exam.goPrev}
              disabled={exam.currentIndex === 0}
            >
              <ChevronLeft size={16} /> Previous
            </Button>

            <FlagButton flagged={exam.isFlagged} onToggle={exam.toggleFlag} />

            {exam.currentIndex < questions.length - 1 ? (
              <Button onClick={exam.goNext}>
                Next <ChevronRight size={16} />
              </Button>
            ) : (
              <Button onClick={confirmSubmit}>
                <Send size={16} /> Submit Exam
              </Button>
            )}
          </div>

          {/* Mobile nav */}
          <div className="mt-6 lg:hidden">
            <NavigationPanel
              total={questions.length}
              currentIndex={exam.currentIndex}
              answers={exam.answers}
              flagged={exam.flagged}
              onGoTo={exam.goTo}
            />
          </div>
        </div>
      </div>

      {/* Submit modal */}
      <Modal
        isOpen={exam.showSubmitModal}
        onClose={() => { exam.setShowSubmitModal(false); timer.resume(); }}
        title="Submit Exam?"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{exam.totalAnswered}</div>
              <div className="text-gray-500 dark:text-gray-400">Answered</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{exam.totalFlagged}</div>
              <div className="text-gray-500 dark:text-gray-400">Flagged</div>
            </div>
          </div>
          {exam.totalAnswered < questions.length && (
            <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              ⚠️ {questions.length - exam.totalAnswered} questions are unanswered.
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you ready to submit your exam? Your results will be shown immediately.
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => { exam.setShowSubmitModal(false); timer.resume(); }}
            >
              Continue Exam
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
