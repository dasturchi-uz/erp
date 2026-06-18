'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, UsersRound, BookOpen, UserCheck, CalendarCheck, Wallet, Receipt, MessageSquare, LogOut, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'hackathon_admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Arizalar (CRM)', path: '/dashboard/crm', icon: <Users size={20} /> },
    { name: 'O‘quvchilar', path: '/dashboard/students', icon: <UsersRound size={20} /> },
    { name: 'Sinflar', path: '/dashboard/classes', icon: <BookOpen size={20} /> },
    { name: 'Davomat', path: '/dashboard/attendance', icon: <UserCheck size={20} /> },
    { name: 'Baholar & Tabel', path: '/dashboard/grades', icon: <CalendarCheck size={20} /> },
    { name: 'To‘lovlar & Chek', path: '/dashboard/payments', icon: <Receipt size={20} /> },
    { name: 'Buxgalteriya', path: '/dashboard/accounting', icon: <Wallet size={20} /> },
    { name: 'SMS xabarlar', path: '/dashboard/messages', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(16,36,62,0.5)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        background: '#fff', 
        borderRight: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: sidebarOpen ? 0 : '-260px',
        transition: 'left 0.3s ease',
        zIndex: 50,
      }} className="sidebar">
        
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)' }}>HACKATHON</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>IT SCHOOL</div>
            </div>
          </div>
          <button className="d-md-none" onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--muted)' }}>
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '20px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/dashboard');
            return (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                background: isActive ? 'var(--teal-light)' : 'transparent',
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}>
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid var(--line)' }}>
          <button onClick={handleLogout} style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '12px', 
            borderRadius: '12px', 
            background: '#fff', 
            color: 'var(--red)', 
            border: '1px solid var(--line)',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}>
            <LogOut size={20} />
            Tizimdan chiqish
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: 0,
        width: '100%'
      }} className="main-content">
        <header style={{ 
          background: '#fff', 
          borderBottom: '1px solid var(--line)', 
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}>
          <button className="d-md-none" onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--navy)' }}>
            <Menu size={24} />
          </button>
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--navy2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              AD
            </div>
            <div className="d-none d-md-block">
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>Admin</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Boshqaruvchi</div>
            </div>
          </div>
        </header>

        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </main>

      <style jsx global>{`
        @media (min-width: 768px) {
          .sidebar { left: 0 !important; }
          .main-content { marginLeft: 260px !important; }
          .d-md-none { display: none !important; }
          .d-none { display: none; }
          .d-md-block { display: block !important; }
        }
      `}</style>
    </div>
  );
}
