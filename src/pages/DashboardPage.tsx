import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkCheck, User } from 'lucide-react';
import { StreakCard } from '../components/dashboard/StreakCard';
import { ScoreChart } from '../components/dashboard/ScoreChart';
import { DomainBreakdown } from '../components/dashboard/DomainBreakdown';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useUser } from '../context/UserContext';
import certifications from '../data/certifications.json';
import type { Certification } from '../types';

const certs = certifications as Certification[];

export function DashboardPage() {
  const navigate = useNavigate();
  const { progress } = useUser();

  const bookmarkedCerts = certs.filter((c) => progress.bookmarks.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <User size={24} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {progress.examHistory.length === 0
              ? 'Welcome! Take your first exam to get started.'
              : `${progress.examHistory.length} exam${progress.examHistory.length > 1 ? 's' : ''} completed`}
          </p>
        </div>
      </div>

      {/* Streak + stats */}
      <div className="mb-8">
        <StreakCard progress={progress} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Score Trend</h2>
          <ScoreChart history={progress.examHistory} />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Domain Performance</h2>
          <DomainBreakdown results={progress.examHistory} />
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Exams</h2>
          {progress.examHistory.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/catalog')}>
              Take Another
            </Button>
          )}
        </div>
        <RecentActivity history={progress.examHistory} />
      </Card>

      {/* Bookmarks */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookmarkCheck size={20} className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bookmarked Exams</h2>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{bookmarkedCerts.length} saved</span>
        </div>

        {bookmarkedCerts.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-400 text-sm mb-4">No bookmarks yet. Bookmark exams from the catalog to save them here.</p>
            <Button variant="secondary" onClick={() => navigate('/catalog')}>Browse Catalog</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => navigate(`/cert/${cert.id}`)}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all cursor-pointer bg-gray-50 dark:bg-gray-700/30"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-0.5">{cert.vendor}</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">{cert.code}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{cert.name}</div>
                  <Badge label={cert.level} variant="level" className="mt-2" />
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => { e.stopPropagation(); navigate(`/exam/${cert.id}`); }}
                  className="flex-shrink-0 text-xs"
                >
                  Start
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {progress.examHistory.length === 0 && (
        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate('/catalog')}>
            Start Your First Exam
          </Button>
        </div>
      )}
    </div>
  );
}
