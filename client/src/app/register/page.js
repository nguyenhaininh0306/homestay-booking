'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import AuthDivider from '@/components/AuthDivider';

const FIELDS = [
  { key: 'name', label: 'Họ tên', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Số điện thoại', type: 'tel' },
  { key: 'password', label: 'Mật khẩu', type: 'password' },
];

const RegisterPage = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

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

  return (
    <div className="mx-auto max-w-[568px] px-6 py-10">
      <div className="overflow-hidden rounded-card border border-line bg-white">
        <h1 className="border-b border-line px-6 py-5 text-center font-semibold text-ink">
          Đăng ký
        </h1>

        <div className="space-y-4 p-6">
          <p className="text-[22px] font-semibold text-ink">Chào mừng đến airkido</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-line">
              {FIELDS.map((field, index) => (
                <input
                  key={field.key}
                  type={field.type}
                  required={field.key !== 'phone'}
                  value={form[field.key]}
                  onChange={handleChange(field.key)}
                  placeholder={field.label}
                  className={`w-full px-3 py-3.5 text-sm outline-none focus:border-ink ${
                    index < FIELDS.length - 1 ? 'border-b border-line' : ''
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-ink-muted">Mật khẩu cần tối thiểu 6 ký tự.</p>

            {status.error && <p className="text-sm text-brand-600">{status.error}</p>}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full rounded-pill bg-brand-600 py-3.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {status.loading ? 'Đang tạo tài khoản...' : 'Đồng ý và tiếp tục'}
            </button>
          </form>

          <AuthDivider text="hoặc" />

          <GoogleLoginButton label="Tiếp tục với Google" />

          <p className="pt-2 text-center text-sm text-ink-muted">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-semibold text-ink underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
