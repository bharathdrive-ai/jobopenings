export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(iso);
}

export function getLevelColor(level: string): string {
  const map: Record<string, string> = {
    Foundational: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    Fundamentals: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    Entry: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Foundation: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    Core: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    Associate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    Professional: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    Specialty: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    Expert: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return map[level] ?? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}

export function getDomainIcon(domain: string): string {
  const map: Record<string, string> = {
    'Cloud — AWS': '☁️',
    'Cloud — Azure': '🔷',
    'Cloud — GCP': '🌐',
    'General IT — CompTIA': '💻',
    'Networking — Cisco': '🔗',
    Cybersecurity: '🔒',
    'Project Management & ITSM': '📋',
    'DevOps, Kubernetes & Linux': '⚙️',
    'Data, AI & Analytics': '📊',
  };
  return map[domain] ?? '📁';
}
