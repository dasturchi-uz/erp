'use client';

import { useState } from 'react';
import { Search, Printer, PlusCircle } from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    { id: 1, studentName: 'Aliyev Vali', amount: 2500000, date: '2026-05-01', status: 'paid', month: 'May' },
    { id: 2, studentName: 'Eshmatov Toshmat', amount: 2800000, date: '2026-05-02', status: 'paid', month: 'May' },
    { id: 3, studentName: 'Qodirova Malika', amount: 2500000, date: '2026-05-05', status: 'debt', month: 'May', debtAmount: 1200000 },
  ]);

  const printReceipt = (payment) => {
    // Open a new window for printing the receipt
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>To'lov kvitansiyasi - ${payment.studentName}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #10243e; }
            .receipt-box { border: 2px dashed #10243e; padding: 30px; border-radius: 16px; max-width: 500px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #e3e8f0; padding-bottom: 20px; margin-bottom: 20px; }
            .logo { width: 60px; height: 60px; border-radius: 50%; margin-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; margin: 0; }
            .subtitle { font-size: 14px; color: #5b6c84; margin-top: 5px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 16px; }
            .label { font-weight: 600; color: #5b6c84; }
            .value { font-weight: 700; }
            .total-row { border-top: 2px solid #e3e8f0; padding-top: 20px; margin-top: 20px; font-size: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #5b6c84; }
            @media print {
              body { padding: 0; }
              .receipt-box { border: none; padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-box">
            <div class="header">
              <div class="title">HACKATHON IT SCHOOL</div>
              <div class="subtitle">Elektron To'lov Kvitansiyasi</div>
            </div>
            
            <div class="row">
              <span class="label">Kvitansiya raqami:</span>
              <span class="value">#REC-${payment.id.toString().padStart(5, '0')}</span>
            </div>
            <div class="row">
              <span class="label">Sana:</span>
              <span class="value">${payment.date}</span>
            </div>
            <div class="row">
              <span class="label">O'quvchi F.I.SH:</span>
              <span class="value">${payment.studentName}</span>
            </div>
            <div class="row">
              <span class="label">To'lov oyi:</span>
              <span class="value">${payment.month} 2026</span>
            </div>
            <div class="row">
              <span class="label">Holati:</span>
              <span class="value" style="color: ${payment.status === 'paid' ? '#1f9d55' : '#d9534f'}">
                ${payment.status === 'paid' ? 'To\'liq to\'langan' : 'Qarzdorlik mavjud'}
              </span>
            </div>
            
            <div class="row total-row">
              <span class="label">Jami to'langan summa:</span>
              <span class="value" style="color: #10243e;">${payment.amount.toLocaleString('uz-UZ')} UZS</span>
            </div>
            
            <div class="footer">
              Ushbu kvitansiya to'lov amalga oshirilganligini tasdiqlaydi.<br>
              +998 50 045 60 10 | www.hackathon-school.uz
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Slight delay to ensure styles load before printing
    setTimeout(() => {
      printWindow.print();
      // printWindow.close(); // Optional: close after print
    }, 500);
  };

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>To'lovlar va Cheklar</h1>
        <button style={{ background: 'var(--navy2)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} /> Qabul qilish
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: 'var(--bg)', color: 'var(--muted)', textAlign: 'left' }}>
                <th style={{ padding: '15px', borderRadius: '12px 0 0 12px' }}>O'quvchi</th>
                <th style={{ padding: '15px' }}>Oy</th>
                <th style={{ padding: '15px' }}>To'langan summa</th>
                <th style={{ padding: '15px' }}>Sana</th>
                <th style={{ padding: '15px' }}>Holat</th>
                <th style={{ padding: '15px', borderRadius: '0 12px 12px 0', textAlign: 'right' }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '15px', fontWeight: 700, color: 'var(--navy)' }}>{payment.studentName}</td>
                  <td style={{ padding: '15px', fontWeight: 600 }}>{payment.month}</td>
                  <td style={{ padding: '15px', fontWeight: 700 }}>{payment.amount.toLocaleString('uz-UZ')} UZS</td>
                  <td style={{ padding: '15px', color: 'var(--muted)' }}>{payment.date}</td>
                  <td style={{ padding: '15px' }}>
                    {payment.status === 'paid' ? (
                      <span style={{ background: '#e6f7eb', color: 'var(--green)', padding: '6px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>To'langan</span>
                    ) : (
                      <span style={{ background: '#fde8e8', color: 'var(--red)', padding: '6px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>Qarzdor: {payment.debtAmount?.toLocaleString('uz-UZ')}</span>
                    )}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    <button 
                      onClick={() => printReceipt(payment)}
                      style={{ background: 'rgba(31, 157, 85, 0.1)', color: 'var(--green)', border: 'none', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Printer size={16} /> Chek (PDF)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
