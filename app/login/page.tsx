"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
          // Jika pendaftaran berhasil, langsung coba login
          const signInResponse = await signIn('credentials', {
            email,
            password,
            redirect: false,
          });
          if (signInResponse?.ok) {
            router.push('/');
          } else {
             setError("Gagal login setelah mendaftar. Silakan coba login manual.");
          }
        } else {
          const data = await res.json();
          setError(data.message || 'Pendaftaran gagal.');
        }
      } catch (err) {
        setError('Terjadi kesalahan. Coba lagi.');
      }
    } 
    // JIKA INGIN LOGIN
    else {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError('Email atau password salah!');
        } else if (result?.ok) {
          router.push('/');
        }
      } catch (err) {
        setError('Terjadi kesalahan. Coba lagi.');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>{isRegister ? 'Daftar' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div style={{ marginBottom: '10px' }}>
            <label>Nama</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
          </div>
        )}
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Memproses...' : (isRegister ? 'Daftar' : 'Login')}
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '20px 0' }}><span>atau</span></div>

      {/* Tombol login dengan Google/GitHub */}
      <button onClick={() => signIn('google', { callbackUrl: '/' })} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>Login dengan Google</button>
      <button onClick={() => signIn('github', { callbackUrl: '/' })} style={{ width: '100%', padding: '10px' }}>Login dengan GitHub</button>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
        <button onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}>
          {isRegister ? ' Login' : ' Daftar di sini'}
        </button>
      </p>
    </div>
  );
}