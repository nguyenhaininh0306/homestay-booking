import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * NextAuth lo phan dang nhap Google. Sau khi Google tra ve id_token, ta doi no
 * lay JWT cua backend Express de moi request API deu dung chung mot co che auth.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  session: { strategy: 'jwt' },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, account }) {
      if (!account?.id_token) return token;

      try {
        const res = await fetch(`${API_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credential: account.id_token }),
        });
        const payload = await res.json();

        if (res.ok && payload.success) {
          token.backendToken = payload.data.token;
          token.backendUser = payload.data.user;
        } else {
          token.authError = payload.message || 'Backend tu choi Google token';
        }
      } catch (error) {
        token.authError = `Khong ket noi duoc API: ${error.message}`;
      }

      return token;
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken ?? null;
      session.authError = token.authError ?? null;
      if (token.backendUser) session.user = { ...session.user, ...token.backendUser };
      return session;
    },
  },
});
