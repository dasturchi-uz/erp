'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Users, TrendingUp, Wallet, AlertCircle, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function DashboardHome() {
  const [stats, setStats] = useState({ totalStudents: 0, newLeads: 0, totalDebt: 0, income: 0 });
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchAiInsights();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: total } = await supabase.from('registrations').select('*', { count: 'exact', head: true });
      const { count: newL } = await supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('status', 'new');
      
      // We mock debts and income for now until Accounting is fully built
      setStats({
        totalStudents: total || 0,
        newLeads: newL || 0,
        totalDebt: 12500000,
        income: 45000000
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiInsights = async () => {
    try {
      const res = await axios.get('/api/ai/insights');
      if (res.data.success) {
        setAiInsights(res.data.insights);
      }
    } catch (err) {
      console.error(err);
      setAiInsights("AI xulosasini yuklashda xatolik yuz berdi. API kalitini tekshiring.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="animate-fade">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Umumiy ko'rsatkichlar</h1>
      
      {/* AI Insights Panel */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0fa 100%)', 
        borderRadius: '16px', 
        padding: '20px', 
        marginBottom: '2rem',
        border: '1px solid rgba(47, 111, 237, 0.2)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Sparkles color="var(--blue)" size={24} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--navy2)' }}>AI Xulosasi va Maslahatlar</h2>
        </div>
        {aiLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)' }}>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Sun'iy intellekt ma'lumotlarni tahlil qilmoqda...
          </div>
        ) : (
          <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: aiInsights?.replace(/\n/g, '<br />') }} />
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
        {/* Stat Cards */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green)', background: '#e6f7eb', padding: '4px 8px', borderRadius: '8px' }}>+12%</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '5px' }}>Jami o'quvchilar</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)' }}>{stats.totalStudents}</div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(47, 111, 237, 0.1)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={24} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255, 122, 48, 0.1)', padding: '4px 8px', borderRadius: '8px' }}>Yangi</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '5px' }}>Yangi arizalar (CRM)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)' }}>{stats.newLeads}</div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(31, 157, 85, 0.1)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '5px' }}>Joriy oy tushumi</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)' }}>{stats.income.toLocaleString('uz-UZ')} <span style={{ fontSize: '1rem', color: 'var(--muted)' }}>UZS</span></div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(217, 83, 79, 0.1)', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '5px' }}>Umumiy qarzdorlik</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--red)' }}>{stats.totalDebt.toLocaleString('uz-UZ')} <span style={{ fontSize: '1rem', color: 'var(--muted)' }}>UZS</span></div>
        </div>
      </div>
    </div>
  );
}
