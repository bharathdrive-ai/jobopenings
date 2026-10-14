import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, BookOpen, LayoutDashboard, Library, Menu, X, GraduationCap, LogIn, LogOut, UserCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAuth, ROLES, ROLE_HOME } from '../../context/AuthContext';

export function Navbar() {
  const { darkMode, toggleDarkMode, showToast } = useUser();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <GraduationCap size={18} /> },
    { to: '/catalog', label: 'Catalog', icon: <Library size={18} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    ...(user ? [{ to: ROLE_HOME[user.role], label: 'My Portal', icon: <UserCircle size={18} /> }] : []),
  ];

  const roleLabel = user ? ROLES.find((r) => r.id === user.role)?.label : '';

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    showToast('Signed out', 'info');
    navigate('/login');
  };

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            <BookOpen size={24} />
            <span>CertPath</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(l.to)
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{roleLabel}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <LogIn size={18} />
                Sign in
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-800">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(l.to)
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                <LogOut size={18} />
                Sign out ({user.name} · {roleLabel})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-400"
              >
                <LogIn size={18} />
                Sign in
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
