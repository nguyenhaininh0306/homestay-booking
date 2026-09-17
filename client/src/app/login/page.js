'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

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
    <div className="mx-auto max-w-md px-4 py-14">
      <h1 className="text-2xl font-bold text-slate-900">Đăng nhập</h1>
      <p className="mt-1 text-sm text-slate-600">Đăng nhập để đặt phòng và quản lý chuyến đi.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Mật khẩu</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={handleChange('password')}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>

        {status.error && <p className="text-sm text-red-600">{status.error}</p>}

        <button
          type="submit"
          disabled={status.loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {status.loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-medium text-brand-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
