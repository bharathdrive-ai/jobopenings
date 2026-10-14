import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, UserSearch, Briefcase, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth, ROLES, ROLE_HOME } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { UserRole } from '../types';

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin: <ShieldCheck size={22} />,
  jobSeeker: <UserSearch size={22} />,
  jobPoster: <Briefcase size={22} />,
};

export function LoginPage() {
  const { user, login } = useAuth();
  const { showToast } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const [role, setRole] = useState<UserRole>('jobSeeker');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }
    const result = login(identifier, password, role);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    showToast(`Welcome back, ${result.user.name}!`);
    navigate(from ?? ROLE_HOME[result.user.role], { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sign in to CertPath</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Choose your role to continue</p>
      </div>

      <Card className="p-6">
        <div role="radiogroup" aria-label="Role" className="grid grid-cols-3 gap-2 mb-6">
          {ROLES.map((r) => {
            const selected = r.id === role;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setRole(r.id);
                  setError('');
                }}
                className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {ROLE_ICONS[r.id]}
                {r.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-3 mb-5 text-center">
          {ROLES.find((r) => r.id === role)?.description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium mb-1">
              Username or email
            </label>
            <input
              id="identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full">
            <LogIn size={18} />
            Sign in as {ROLES.find((r) => r.id === role)?.label}
          </Button>
        </form>
      </Card>
    </div>
  );
}
