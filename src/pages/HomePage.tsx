import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, BarChart3, CheckCircle, BookOpen, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import certifications from '../data/certifications.json';
import type { Certification } from '../types';
import { getDomainIcon } from '../utils/formatters';

const certs = certifications as Certification[];

const DOMAINS = [...new Set(certs.map((c) => c.domain))];
const DOMAIN_COUNTS = DOMAINS.map((d) => ({
  name: d,
  count: certs.filter((c) => c.domain === d).length,
  icon: getDomainIcon(d),
}));

const FEATURED = certs.filter((c) => c.popular).slice(0, 6);

const STATS = [
  { label: 'Certification Exams', value: '111' },
  { label: 'Practice Questions', value: '1,700+' },
  { label: 'Domains Covered', value: '11' },
  { label: 'Active Learners', value: '24,500+' },
];

const HOW_IT_WORKS = [
  { icon: <BookOpen size={28} />, title: 'Browse & Choose', desc: 'Explore 111 certifications across 11 domains. Filter by vendor, level, and domain to find your target exam.' },
  { icon: <Zap size={28} />, title: 'Practice & Learn', desc: 'Take full-length timed practice exams with realistic MCQ questions and instant answer explanations.' },
  { icon: <BarChart3 size={28} />, title: 'Track Progress', desc: 'Review detailed score breakdowns, identify weak domains, and monitor your improvement over time.' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalog?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E3A5F] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-600/30 border border-indigo-500/50 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <Shield size={14} />
            111 exams across 11 domains
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ace Your IT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Certification Exams
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Practice with 1,700+ realistic exam questions. Get instant feedback, detailed explanations, and track your progress across AWS, Azure, GCP, CompTIA, Cisco, and more.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search certifications (AWS, CISSP, CKA…)"
              className="flex-1"
            />
            <Button type="submit" size="lg" className="sm:w-auto whitespace-nowrap">
              Search <ArrowRight size={16} />
            </Button>
          </form>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/catalog')}>
              Browse All Exams <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-indigo-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Domains */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">Browse by Domain</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">9 comprehensive domains covering every major IT career path</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOMAIN_COUNTS.map((d) => (
              <button
                key={d.name}
                onClick={() => navigate(`/catalog?domain=${encodeURIComponent(d.name)}`)}
                className="flex items-center gap-4 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all text-left bg-gray-50 dark:bg-gray-800"
              >
                <span className="text-3xl">{d.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{d.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{d.count} exams</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">Most Popular Exams</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">Start with the industry's most sought-after certifications</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((cert) => (
              <div
                key={cert.id}
                onClick={() => navigate(`/cert/${cert.id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{cert.vendor}</span>
                  <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">{cert.level}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{cert.code}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cert.name}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" />{cert.questionCount} Qs</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{cert.timeMinutes} min</span>
                  <span>Pass: {cert.passingScore}%</span>
                </div>
                <Button size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/exam/${cert.id}`); }}>
                  Start Practice
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="secondary" size="lg" onClick={() => navigate('/catalog')}>
              View All 111 Exams <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
