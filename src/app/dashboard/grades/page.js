'use client';

import { useState } from 'react';
import { FileText, Award } from 'lucide-react';

export default function GradesPage() {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Aliyev Vali', 
      grade: '9-A',
      gpa: 4.8,
      subjects: [
        { name: 'Matematika', score: 5 },
        { name: 'Fizika', score: 4 },
        { name: 'Dasturlash (IT)', score: 5 },
        { name: 'Ingliz tili', score: 5 },
      ],
      attendance: '95%'
    },
    { 
      id: 2, 
      name: 'Qodirova Malika', 
      grade: '9-A',
      gpa: 4.5,
      subjects: [
        { name: 'Matematika', score: 4 },
        { name: 'Fizika', score: 4 },
        { name: 'Dasturlash (IT)', score: 5 },
        { name: 'Ingliz tili', score: 5 },
      ],
      attendance: '98%'
    }
  ]);

  const printReportCard = (student) => {
    const printWindow = window.open('', '', 'width=900,height=700');
    
    let subjectsHtml = '';
    student.subjects.forEach(sub => {
      subjectsHtml += `
        <tr>
          <td style="padding: 12px; border: 1px solid #e3e8f0;">${sub.name}</td>
          <td style="padding: 12px; border: 1px solid #e3e8f0; text-align: center; font-weight: bold;">${sub.score}</td>
        </tr>
      `;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Baho Tabeli - ${student.name}</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #10243e; }
            .report-box { border: 2px solid #10243e; padding: 40px; border-radius: 8px; max-width: 700px; margin: 0 auto; position: relative; }
            .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; font-size: 100px; font-weight: 900; z-index: -1; text-align: center; line-height: 1; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; }
            .subtitle { font-size: 16px; color: #5b6c84; margin-top: 8px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #f5f7fb; padding: 20px; border-radius: 8px; }
            .info-item { font-size: 16px; }
            .info-label { font-weight: 600; color: #5b6c84; margin-right: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #10243e; color: #fff; padding: 15px 12px; text-align: left; }
            th.center { text-align: center; }
            .summary { display: flex; justify-content: space-between; border-top: 2px solid #10243e; padding-top: 20px; font-size: 18px; }
            .signatures { display: flex; justify-content: space-between; margin-top: 60px; }
            .sig-line { border-top: 1px solid #10243e; width: 200px; text-align: center; padding-top: 10px; font-size: 14px; font-weight: 600; }
            @media print {
              body { padding: 0; }
              .report-box { border: none; padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="report-box">
            <div class="watermark">HACKATHON<br>IT SCHOOL</div>
            <div class="header">
              <div class="title">O'quvchining Baho Tabeli</div>
              <div class="subtitle">2025-2026 O'quv yili / 3-Chorak</div>
            </div>
            
            <div class="info-grid">
              <div class="info-item"><span class="info-label">F.I.SH:</span> <strong>${student.name}</strong></div>
              <div class="info-item"><span class="info-label">Sinf:</span> <strong>${student.grade}</strong></div>
              <div class="info-item"><span class="info-label">O'rtacha ball (GPA):</span> <strong>${student.gpa}</strong></div>
              <div class="info-item"><span class="info-label">Davomat:</span> <strong>${student.attendance}</strong></div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Fan nomi</th>
                  <th class="center" style="width: 150px;">Chorak bahosi</th>
                </tr>
              </thead>
              <tbody>
                ${subjectsHtml}
              </tbody>
            </table>

            <div class="summary">
              <div><strong>Direktor xulosasi:</strong> O'zlashtirish yaxshi. IT fanlariga alohida qiziqish mavjud.</div>
            </div>

            <div class="signatures">
              <div class="sig-line">Sinf rahbari imzosi</div>
              <div class="sig-line">Maktab direktori imzosi</div>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Baholar va Tabel</h1>
      </div>

      <div style={{ background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', color: 'var(--muted)', textAlign: 'left' }}>
              <th style={{ padding: '15px', borderRadius: '12px 0 0 12px' }}>O'quvchi</th>
              <th style={{ padding: '15px' }}>Sinf</th>
              <th style={{ padding: '15px' }}>GPA</th>
              <th style={{ padding: '15px' }}>Davomat</th>
              <th style={{ padding: '15px', borderRadius: '0 12px 12px 0', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '15px', fontWeight: 700, color: 'var(--navy)' }}>{student.name}</td>
                <td style={{ padding: '15px', fontWeight: 600 }}>{student.grade}</td>
                <td style={{ padding: '15px', fontWeight: 700, color: 'var(--blue)' }}>{student.gpa}</td>
                <td style={{ padding: '15px', color: 'var(--muted)' }}>{student.attendance}</td>
                <td style={{ padding: '15px', textAlign: 'right' }}>
                  <button 
                    onClick={() => printReportCard(student)}
                    style={{ background: 'rgba(47, 111, 237, 0.1)', color: 'var(--blue)', border: 'none', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <FileText size={16} /> Tabel (PDF)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
