import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { AuthUser, RoleInfo, UserRole } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import usersData from '../data/users.json';

interface StoredUser extends AuthUser {
  password: string;
}

const USERS = usersData.users as StoredUser[];
export const ROLES = usersData.roles as RoleInfo[];

export const ROLE_HOME: Record<UserRole, string> = {
  admin: '/admin',
  jobSeeker: '/seeker',
  jobPoster: '/poster',
};

type LoginResult = { ok: true; user: AuthUser } | { ok: false; error: string };

interface AuthContextValue {
  user: AuthUser | null;
  login: (identifier: string, password: string, role: UserRole) => LoginResult;
  logout: () => void;
  listUsers: () => AuthUser[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toPublicUser({ password: _password, ...user }: StoredUser): AuthUser {
  return user;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<AuthUser | null>('authUser', null);

  const login = useCallback(
    (identifier: string, password: string, role: UserRole): LoginResult => {
      const id = identifier.trim().toLowerCase();
      const match = USERS.find(
        (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id
      );
      if (!match || match.password !== password) {
        return { ok: false, error: 'Invalid username or password.' };
      }
      if (match.role !== role) {
        const label = ROLES.find((r) => r.id === match.role)?.label ?? match.role;
        return { ok: false, error: `This account is registered as ${label}. Select that role to sign in.` };
      }
      const publicUser = toPublicUser(match);
      setUser(publicUser);
      return { ok: true, user: publicUser };
    },
    [setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const listUsers = useCallback(() => USERS.map(toPublicUser), []);

  const value = useMemo(() => ({ user, login, logout, listUsers }), [user, login, logout, listUsers]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
