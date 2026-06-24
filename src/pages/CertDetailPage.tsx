import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Target, BookOpen, BookmarkPlus, BookmarkCheck, Lock } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { QuestionCard } from '../components/exam/QuestionCard';
import { useUser } from '../context/UserContext';
import { getQuestionsForCert } from '../data/questions/index';
import certifications from '../data/certifications.json';
import type { Certification } from '../types';

const certs = certifications as Certification[];

export function CertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark, showToast } = useUser();

  const cert = certs.find((c) => c.id === id);
  if (!cert) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certification not found</h2>
        <Button onClick={() => navigate('/catalog')}>Back to Catalog</Button>
      </div>
    );
  }

  const questions = getQuestionsForCert(cert.id, cert.domain);
  const sampleQuestions = questions.slice(0, 3);

  const handleBookmark = () => {
    toggleBookmark(cert.id);
    showToast(isBookmarked(cert.id) ? `Removed from bookmarks` : `Bookmarked ${cert.name}`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate('/catalog')}
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm text-indigo-300 font-medium mb-1">{cert.vendor}</div>
            <h1 className="text-3xl font-bold mb-2">{cert.code} — {cert.name}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge label={cert.level} variant="level" className="!bg-white/20 !text-white" />
              <Badge label={cert.domain} className="!bg-white/20 !text-white" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBookmark}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isBookmarked(cert.id) ? <BookmarkCheck size={20} /> : <BookmarkPlus size={20} />}
            </button>
          </div>
        </div>
        <p className="mt-4 text-indigo-100 leading-relaxed">{cert.description}</p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <CheckCircle size={20} className="text-green-500" />, label: 'Questions', value: cert.questionCount },
          { icon: <Clock size={20} className="text-blue-500" />, label: 'Time Limit', value: `${cert.timeMinutes} min` },
          { icon: <Target size={20} className="text-amber-500" />, label: 'Passing Score', value: cert.passingScore > 0 ? `${cert.passingScore}%` : 'Pass/Fail' },
          { icon: <BookOpen size={20} className="text-purple-500" />, label: 'Topics', value: cert.topics.length },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="flex justify-center mb-2">{card.icon}</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{card.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Topics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topics Covered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {cert.topics.map((topic) => (
            <div key={topic} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Sample questions */}
      {sampleQuestions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sample Questions</h2>
          <div className="space-y-8">
            {sampleQuestions.map((q, i) => (
              <div key={q.id} className={`relative ${i === 2 ? 'overflow-hidden' : ''}`}>
                <QuestionCard
                  question={q}
                  questionNumber={i + 1}
                  total={sampleQuestions.length}
                  selectedOption={-1}
                  onSelect={() => {}}
                />
                {i === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white dark:via-gray-800/70 dark:to-gray-800 flex items-end justify-center pb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm font-medium">
                      <Lock size={16} />
                      Start exam to see all questions
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="flex-1" onClick={() => navigate(`/exam/${cert.id}`)}>
          Start Practice Exam <CheckCircle size={18} />
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate('/catalog')}>
          Browse More Exams
        </Button>
      </div>
    </div>
  );
}
