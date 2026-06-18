'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Phone, Calendar, Search } from 'lucide-react';

export default function CRMPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      await supabase.from('registrations').update({ status: newStatus }).eq('id', id);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    l.phone?.includes(search)
  );

  const columns = [
    { id: 'new', title: 'Yangi', color: 'var(--blue)' },
    { id: 'contacted', title: 'Bog‘lanildi', color: 'var(--accent)' },
    { id: 'testing', title: 'Suhbat/Test', color: 'var(--navy2)' },
    { id: 'accepted', title: 'Qabul qilindi', color: 'var(--green)' },
    { id: 'rejected', title: 'Rad etildi', color: 'var(--red)' }
  ];

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Arizalar (CRM)</h1>
        
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input 
            type="text" 
            placeholder="Ism yoki telefon orqali izlash..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '12px', border: '1px solid var(--line)' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
        {columns.map(col => {
          const colLeads = filteredLeads.filter(l => (l.status || 'new') === col.id);
          
          return (
            <div key={col.id} style={{ minWidth: '300px', width: '300px', background: '#e9ecef', borderRadius: '16px', padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--navy)' }}>{col.title}</h3>
                <span style={{ background: col.color, color: '#fff', fontSize: '0.8rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                  {colLeads.length}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '100px' }}>
                {colLeads.map(lead => (
                  <div key={lead.id} style={{ background: '#fff', borderRadius: '12px', padding: '15px', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${col.color}` }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>{lead.full_name}</div>
                    
                    <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '6px', textDecoration: 'none' }}>
                      <Phone size={14} /> {lead.phone}
                    </a>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '12px' }}>
                      <Calendar size={14} /> {new Date(lead.created_at).toLocaleDateString('uz-UZ')}
                    </div>
                    
                    <select 
                      value={lead.status || 'new'} 
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '0.8rem', outline: 'none' }}
                    >
                      {columns.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                ))}
                {colLeads.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem', padding: '20px 0' }}>
                    Arizalar yo'q
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
