import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Library, LayoutDashboard, Briefcase, Search, PlusCircle } from 'lucide-react';
import { useAuth, ROLES } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const { user } = useAuth();
  return (
    <div className="mb-8">
      <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Signed in as {user?.name}</p>
      <h1 className="text-3xl font-bold mt-1">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function ActionCard({ to, icon, title, text }: { to: string; icon: React.ReactNode; title: string; text: string }) {
  return (
    <Link to={to}>
      <Card hover className="p-5 h-full">
        <div className="text-indigo-600 dark:text-indigo-400 mb-3">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{text}</p>
      </Card>
    </Link>
  );
}

export function AdminHomePage() {
  const { listUsers } = useAuth();
  const users = listUsers();
  const roleLabel = (id: string) => ROLES.find((r) => r.id === id)?.label ?? id;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <PageHeader title="Admin Console" subtitle="Accounts are loaded from src/data/users.json." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {ROLES.map((r) => (
          <Card key={r.id} className="p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{r.label}s</p>
            <p className="text-3xl font-bold mt-1">{users.filter((u) => u.role === r.id).length}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">
          <Users size={18} /> All users
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40">
              <tr>
                <th className="px-5 py-2 font-medium">Name</th>
                <th className="px-5 py-2 font-medium">Username</th>
                <th className="px-5 py-2 font-medium">Email</th>
                <th className="px-5 py-2 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-gray-100 dark:border-gray-700/60">
                  <td className="px-5 py-3">{u.name}</td>
                  <td className="px-5 py-3 font-mono">{u.username}</td>
                  <td className="px-5 py-3">{u.email}</td>
                  <td className="px-5 py-3"><Badge label={roleLabel(u.role)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function SeekerHomePage() {
  const { progress } = useUser();
  const passed = progress.examHistory.filter((r) => r.passed).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <PageHeader title="Job Seeker Home" subtitle="Build your certification record and stand out to employers." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Practice exams taken</p>
          <p className="text-3xl font-bold mt-1">{progress.examHistory.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Exams passed</p>
          <p className="text-3xl font-bold mt-1">{passed}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Bookmarked certs</p>
          <p className="text-3xl font-bold mt-1">{progress.bookmarks.length}</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard to="/catalog" icon={<Library size={24} />} title="Browse certifications" text="Pick an exam and start practising." />
        <ActionCard to="/dashboard" icon={<LayoutDashboard size={24} />} title="My progress" text="Scores, streaks and domain breakdown." />
      </div>
    </div>
  );
}

export function PosterHomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <PageHeader title="Job Poster Home" subtitle="Hire candidates with verified certification practice." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-indigo-600 dark:text-indigo-400 mb-3"><PlusCircle size={24} /></div>
          <h3 className="font-semibold">Post a job</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Job posting is coming soon.</p>
        </Card>
        <Card className="p-5">
          <div className="text-indigo-600 dark:text-indigo-400 mb-3"><Briefcase size={24} /></div>
          <h3 className="font-semibold">My openings</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You have no active job posts.</p>
        </Card>
        <ActionCard to="/catalog" icon={<Search size={24} />} title="Explore certifications" text="See which certs to ask candidates for." />
      </div>
    </div>
  );
}
