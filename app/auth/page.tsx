'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { signIn, signUp } from '@/lib/auth';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await signIn(form.email, form.password);
        router.push('/');
      } else {
        if (!form.fullName) { setError('Naam zaroor likhein'); setLoading(false); return; }
        await signUp(form.email, form.password, form.fullName);
        setSuccess('Account ban gaya! Email check karein confirmation ke liye.');
      }
    } catch (err: any) {
      setError(err.message || 'Kuch ghalat hua — dobara try karein');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh', backgroundColor: '#f5f0eb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '48px 40px', width: '100%', maxWidth: '440px', boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>
          
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.1em' }}>
              VASTR
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#8a8a8a', marginTop: '4px' }}>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </p>
          </div>

          {/* Toggle */}
          <div style={{ display: 'flex', marginBottom: '32px', borderBottom: '1px solid #e8e0d5' }}>
            {['Login', 'Sign Up'].map((tab, i) => (
              <button key={tab} onClick={() => { setIsLogin(i === 0); setError(''); setSuccess(''); }} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: isLogin === (i === 0) ? '2px solid #1a1a1a' : '2px solid transparent', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: isLogin === (i === 0) ? '#1a1a1a' : '#8a8a8a', cursor: 'pointer', marginBottom: '-1px' }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Error/Success */}
          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#c41e1e' }}>{error}</p>
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#166534' }}>{success}</p>
            </div>
          )}

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLogin && (
              <div>
                <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input name="fullName" type="text" value={form.fullName} onChange={handleChange} placeholder="Apna naam likhein" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
              </div>
            )}

            <div>
              <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>
                Email
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
            </div>

            <div>
              <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', backgroundColor: loading ? '#8a8a8a' : '#1a1a1a', color: '#ffffff', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', transition: 'all 0.3s ease' }}>
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>

          {isLogin && (
            <p style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a' }}>
              <Link href="/reset-password" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
                Password bhool gaye?
              </Link>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}