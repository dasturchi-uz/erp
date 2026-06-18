'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAdminLock = () => {
    const pwd = prompt("🔐 Admin parolini kiriting:");
    if (pwd === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      document.cookie = "hackathon_admin_session=1; path=/; max-age=86400"; // 1 day
      router.push('/dashboard');
    } else if (pwd !== null) {
      alert("Noto‘g‘ri parol!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setMessage({ type: 'danger', text: 'Ism va familiya hamda telefon majburiy' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([{ full_name: fullName, phone: phone, status: 'new' }]);

      if (error) throw error;

      setSuccess(true);
      setFullName('');
      setPhone('');
    } catch (err) {
      setMessage({ type: 'danger', text: "Xatolik: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="seats-strip" style={{ background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%)', color: '#21130a', fontWeight: 700, textAlign: 'center', padding: '10px 0', letterSpacing: '.02em', fontSize: '.92rem' }}>
        ⚡ JOYLAR SONI CHEKLANGAN — 2026-yil qabuli boshlandi
      </div>

      <header className="hero py-5" style={{ background: 'radial-gradient(1200px 600px at 80% -10%, #2a4a82 0%, var(--navy) 55%, #0b1929 100%)', color: '#fff', position: 'relative', overflow: 'hidden', padding: '3rem 0' }}>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <img src="/logo.png" alt="Hackathon IT School" style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.5)' }} />
            <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '999px', padding: '10px 20px', fontSize: '.85rem', fontWeight: 700, color: '#fff', backdropFilter: 'blur(6px)' }}>
              📋 Oylik to‘lovlar haqida ma'lumot
            </a>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '999px', padding: '6px 16px', fontSize: '.8rem', fontWeight: 600, backdropFilter: 'blur(6px)', marginBottom: '1rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 4px rgba(255,122,48,.2)' }}></span>
            HACKATHON IT SCHOOL — Xususiy maktab
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.01em', marginBottom: '1rem' }}>
            2026-yil qabul uchun <span style={{ color: 'var(--accent2)' }}>ariza topshiring</span>
          </h1>
          <p style={{ maxWidth: '560px', opacity: 0.85, fontSize: '1.25rem', marginBottom: '0' }}>
            Zamonaviy IT yo‘nalishidagi xususiy maktabimizga farzandingizni yozish uchun quyidagi formani to‘ldiring — operatorlarimiz tez orada siz bilan bog‘lanadi.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '28px' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '16px', padding: '14px 18px', minWidth: '160px' }}>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', opacity: 0.65 }}>Qabul yili</div>
              <div style={{ fontWeight: 700, fontSize: '1.02rem', marginTop: '2px' }}>2026</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '16px', padding: '14px 18px', minWidth: '160px' }}>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', opacity: 0.65 }}>Bog‘lanish</div>
              <div style={{ fontWeight: 700, fontSize: '1.02rem', marginTop: '2px' }}>+998 50 045 60 10</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '16px', padding: '14px 18px', minWidth: '160px' }}>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', opacity: 0.65 }}>Yo‘nalish</div>
              <div style={{ fontWeight: 700, fontSize: '1.02rem', marginTop: '2px' }}>IT & Texnologiya</div>
            </div>
          </div>
        </div>
      </header>

      <section className="container" style={{ padding: '3rem 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: '#fff', borderRadius: '28px', boxShadow: '0 24px 48px -20px rgba(16,36,62,0.18)', border: '1px solid var(--line)', padding: '2rem' }}>
          {!success ? (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '4px' }}>Qabulga yozilish</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Ism va telefon raqamingizni qoldiring — qolgan maʼlumotlarni keyinroq operatorimiz bilan birga to‘ldirasiz</p>
              
              {message && (
                <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '15px', background: message.type === 'danger' ? '#fde8e8' : '#e6f7f5', color: message.type === 'danger' ? '#d9534f' : '#1ea7a0' }}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--ink)', marginBottom: '6px', display: 'block' }}>O‘quvchining F.I.SH <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ism Familiya Sharifi" 
                    required 
                    style={{ width: '100%', borderRadius: '14px', padding: '13px 16px', border: '1.5px solid var(--line)', fontSize: '.96rem' }} 
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--ink)', marginBottom: '6px', display: 'block' }}>Telefon raqami <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67" 
                    required 
                    style={{ width: '100%', borderRadius: '14px', padding: '13px 16px', border: '1.5px solid var(--line)', fontSize: '.96rem' }} 
                  />
                </div>
                <button type="submit" disabled={loading} style={{ background: 'var(--navy2)', border: 'none', color: '#fff', borderRadius: '14px', padding: '15px 20px', fontWeight: 700, fontSize: '1.02rem', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Yuborilmoqda...' : 'Qabulga yozilish'}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3.6rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>Rahmat!</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Arizangiz muvaffaqiyatli qabul qilindi. Operatorlarimiz tez orada siz bilan bog‘lanib, qolgan maʼlumotlarni aniqlashtiradi.</p>
              <button onClick={() => setSuccess(false)} style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 24px', fontWeight: 600 }}>Yana ariza qoldirish</button>
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,.72)', padding: '2rem 0', textAlign: 'center', marginTop: '2rem' }}>
        <div className="container">
          <img src="/logo.png" alt="Hackathon IT School" style={{ width: '48px', height: '48px', borderRadius: '50%', marginBottom: '10px' }} />
          <p style={{ fontWeight: 700, color: '#fff', marginBottom: '4px' }}>HACKATHON IT SCHOOL</p>
          <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>© 2026 · Tel: <a href="tel:+998500456010" style={{ color: '#fff', fontWeight: 600 }}>+998 50 045 60 10</a> · Joylar soni cheklangan</p>
          <a href="/about" style={{ color: '#fff', fontSize: '0.9rem', textDecoration: 'underline' }}>Maktab haqida va oylik to‘lovlar →</a>
        </div>
      </footer>

      <div 
        onClick={handleAdminLock}
        style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(16,36,62,0.92)', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 20px rgba(16,36,62,0.35)', zIndex: 1050, fontSize: '20px', opacity: 0.35 }}
      >
        🔒
      </div>
    </>
  );
}
