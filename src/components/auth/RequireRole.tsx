import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, ROLE_HOME } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface RequireRoleProps {
  roles?: UserRole[];
  children: React.ReactNode;
}

/** Sends signed-out visitors to /login, and signed-in users without a listed role to their own home. */
export function RequireRole({ roles, children }: RequireRoleProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to={ROLE_HOME[user.role]} replace />;
  return <>{children}</>;
}
