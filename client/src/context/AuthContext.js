'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { apiFetch, tokenStore } from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!tokenStore.get()) return setLoading(false);
      try {
        const { data } = await apiFetch('/auth/me', { auth: true });
        setUser(data);
      } catch {
        tokenStore.clear();
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await apiFetch('/auth/login', { method: 'POST', body: credentials });
    tokenStore.set(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await apiFetch('/auth/register', { method: 'POST', body: payload });
    tokenStore.set(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phai duoc dung ben trong AuthProvider');
  return ctx;
};
