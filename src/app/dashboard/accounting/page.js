'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { PlusCircle, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AccountingPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    transaction_type: 'income',
    category: 'tuition',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Mock data for initial render if DB is empty
  const [chartData, setChartData] = useState([
    { name: 'Yanvar', Kirim: 40000000, Chiqim: 12000000 },
    { name: 'Fevral', Kirim: 38000000, Chiqim: 15000000 },
    { name: 'Mart', Kirim: 45000000, Chiqim: 14000000 },
    { name: 'Aprel', Kirim: 42000000, Chiqim: 22000000 },
  ]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('accounting')
        .select('*')
        .order('date', { ascending: false });

      if (error && error.code !== '42P01') { // Ignore missing table error initially
        console.error(error);
      } else if (data) {
        setTransactions(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('accounting').insert([{
        ...formData,
        amount: Number(formData.amount)
      }]);
      
      if (error) throw error;
      
      setShowModal(false);
      fetchTransactions();
    } catch (err) {
      alert("Xatolik: Baza jadvallari yaratilmagan bo'lishi mumkin.");
      console.error(err);
    }
  };

  const totalIncome = transactions.filter(t => t.transaction_type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = transactions.filter(t => t.transaction_type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Buxgalteriya va Xarajatlar</h1>
        <button onClick={() => setShowModal(true)} style={{ background: 'var(--navy2)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} /> Yangi operatsiya
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: 'var(--muted)' }}>
            <Wallet size={20} /> <span style={{ fontWeight: 600 }}>Joriy Balans</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>
            {balance.toLocaleString('uz-UZ')} <span style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>UZS</span>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: 'var(--muted)' }}>
            <TrendingUp size={20} color="var(--green)" /> <span style={{ fontWeight: 600 }}>Jami Kirim</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--green)' }}>
            {totalIncome.toLocaleString('uz-UZ')} <span style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>UZS</span>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: 'var(--muted)' }}>
            <TrendingDown size={20} color="var(--red)" /> <span style={{ fontWeight: 600 }}>Jami Chiqim</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--red)' }}>
            {totalExpense.toLocaleString('uz-UZ')} <span style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>UZS</span>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem', height: '400px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Kirim va Chiqim statistikasi</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e3e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
            <Tooltip formatter={(value) => `${value.toLocaleString('uz-UZ')} UZS`} />
            <Legend />
            <Bar dataKey="Kirim" fill="var(--green)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Chiqim" fill="var(--red)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,36,62,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '30px', width: '100%', maxWidth: '500px', position: 'relative' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '20px' }}>Yangi operatsiya qo'shish</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Operatsiya turi</label>
                <select value={formData.transaction_type} onChange={e => setFormData({...formData, transaction_type: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <option value="income">Kirim (Tushum)</option>
                  <option value="expense">Chiqim (Xarajat)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Toifa (Kategoriya)</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  {formData.transaction_type === 'income' ? (
                    <>
                      <option value="tuition">O'quv to'lovi</option>
                      <option value="other_income">Boshqa kirimlar</option>
                    </>
                  ) : (
                    <>
                      <option value="salary">Oylik maoshlar</option>
                      <option value="food">Oziq-ovqat</option>
                      <option value="utilities">Kommunal to'lovlar</option>
                      <option value="marketing">Reklama / Marketing</option>
                      <option value="other_expense">Boshqa xarajatlar</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Summa (UZS)</label>
                <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="Masalan: 1500000" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Sana</label>
                <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Izoh</label>
                <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Nimaga sarflandi yoki kimdan tushdi?" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '12px', fontWeight: 600 }}>Bekor qilish</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 600 }}>Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
