'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import AuthDivider from '@/components/AuthDivider';

const LoginPage = () => {
  const { login, authError } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      await login(form);
      router.push('/');
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="mx-auto max-w-[568px] px-6 py-10">
      <div className="overflow-hidden rounded-card border border-line bg-white">
        <h1 className="border-b border-line px-6 py-5 text-center font-semibold text-ink">
          Đăng nhập
        </h1>

        <div className="space-y-4 p-6">
          <div>
            <p className="text-[22px] font-semibold text-ink">Chào mừng đến airkido</p>
            <p className="mt-1 text-sm text-ink-muted">
              Đăng nhập để đặt phòng và quản lý chuyến đi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-line">
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange('email')}
                placeholder="Email"
                className="w-full border-b border-line px-3 py-3.5 text-sm outline-none focus:border-ink"
              />
              <input
                type="password"
                required
                value={form.password}
                onChange={handleChange('password')}
                placeholder="Mật khẩu"
                className="w-full px-3 py-3.5 text-sm outline-none focus:border-ink"
              />
            </div>

            {(status.error || authError) && (
              <p className="text-sm text-brand-600">{status.error || authError}</p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full rounded-pill bg-brand-600 py-3.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {status.loading ? 'Đang đăng nhập...' : 'Tiếp tục'}
            </button>
          </form>

          <AuthDivider text="hoặc" />

          <GoogleLoginButton label="Tiếp tục với Google" />

          <p className="pt-2 text-center text-sm text-ink-muted">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-semibold text-ink underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
