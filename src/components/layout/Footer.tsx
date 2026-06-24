import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <BookOpen size={24} className="text-indigo-400" />
              CertPath
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The most comprehensive IT certification exam prep platform. Master 87 exams across 9 domains with realistic practice tests and detailed explanations.
            </p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/catalog', 'Exam Catalog'], ['/dashboard', 'Dashboard']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Top Domains</h4>
            <ul className="space-y-2 text-sm">
              {['Cloud — AWS', 'Cloud — Azure', 'Cybersecurity', 'Networking — Cisco', 'DevOps, Kubernetes & Linux'].map((d) => (
                <li key={d}>
                  <Link to={`/catalog?domain=${encodeURIComponent(d)}`} className="hover:text-white transition-colors">{d}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} CertPath. All certification names are trademarks of their respective owners.
        </div>
      </div>
    </footer>
  );
}
