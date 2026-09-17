'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      await register(form);
      router.push('/');
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  const fields = [
    { key: 'name', label: 'Họ tên', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Số điện thoại', type: 'tel' },
    { key: 'password', label: 'Mật khẩu (tối thiểu 6 ký tự)', type: 'password' },
  ];

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <h1 className="text-2xl font-bold text-slate-900">Đăng ký tài khoản</h1>
      <p className="mt-1 text-sm text-slate-600">Tạo tài khoản để bắt đầu đặt homestay.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        {fields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">{field.label}</span>
            <input
              type={field.type}
              required={field.key !== 'phone'}
              value={form[field.key]}
              onChange={handleChange(field.key)}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
            />
          </label>
        ))}

        {status.error && <p className="text-sm text-red-600">{status.error}</p>}

        <button
          type="submit"
          disabled={status.loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {status.loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Đã có tài khoản?{' '}
          <Link href="/login" className="font-medium text-brand-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
