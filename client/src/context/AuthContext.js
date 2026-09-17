'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useSession, signIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { apiFetch, tokenStore } from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khoi phuc phien dang nhap bang email/mat khau tu token trong localStorage
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

  // Dong bo phien Google cua NextAuth sang token cua backend
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated' && session?.backendToken) {
      tokenStore.set(session.backendToken);
      setUser(session.user);
      setLoading(false);
    }
  }, [status, session]);

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

  const loginWithGoogle = useCallback(() => signIn('google', { callbackUrl: '/' }), []);

  const logout = useCallback(async () => {
    tokenStore.clear();
    setUser(null);
    if (session) await nextAuthSignOut({ callbackUrl: '/' });
  }, [session]);

  const value = useMemo(
    () => ({
      user,
      loading: loading || status === 'loading',
      isAuthenticated: Boolean(user),
      authError: session?.authError ?? null,
      login,
      register,
      loginWithGoogle,
      logout,
    }),
    [user, loading, status, session, login, register, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phai duoc dung ben trong AuthProvider');
  return ctx;
};
