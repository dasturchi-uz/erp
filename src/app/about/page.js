export const metadata = {
  title: 'Maktab haqida | HACKATHON IT SCHOOL',
  description: 'Hackathon IT School - Oylik to\'lovlar va ta\'lim dasturi haqida ma\'lumot.',
};

export default function AboutPage() {
  return (
    <>
      <header className="py-4" style={{ background: 'var(--navy)', color: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', textDecoration: 'none' }}>←</a>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#fff' }}>HACKATHON IT SCHOOL</h2>
        </div>
      </header>

      <div className="container" style={{ padding: '3rem 20px', maxWidth: '800px' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2.4rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Kelajak kasblariga yo‘naltirilgan ta’lim
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          Bizning maktab o‘quvchilarni nafaqat an’anaviy fanlar bo‘yicha, balki zamonaviy texnologiyalar, dasturlash va dizayn sohalarida amaliy bilimlarga o‘rgatishga ixtisoslashgan.
        </p>

        <section style={{ background: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)', marginBottom: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.5rem', color: 'var(--navy2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>💰</span> Oylik to‘lovlar (2026)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px dashed var(--line)' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--navy)' }}>Boshlang‘ich sinflar (1-4)</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>3 mahal ovqat, uzaytirilgan kun (17:00 gacha)</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent)' }}>2 500 000 so‘m</div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px dashed var(--line)' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--navy)' }}>O‘rta sinflar (5-9)</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>IT chuqurlashtirilgan, 2 mahal ovqat</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent)' }}>2 800 000 so‘m</div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--navy)' }}>Yuqori sinflar (10-11)</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Kasbga yo‘naltirish (Front/Back, AI), IELTS tayyorlov</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent)' }}>3 200 000 so‘m</div>
            </div>
          </div>
          <div style={{ marginTop: '20px', background: 'var(--teal-light)', padding: '15px', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--teal)' }}>
            <strong>💡 Chegirmalar:</strong> Bir oiladan 2 ta farzand o‘qisa, ikkinchisiga 15% chegirma qilinadi.
          </div>
        </section>

        <section style={{ background: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)', marginBottom: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.5rem', color: 'var(--navy2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>🚀</span> Nega aynan biz?
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--green)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '2px' }}>Amaliy IT darslar</strong>
                <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>O‘quvchilar 5-sinfdan boshlab real loyihalar yaratishni o‘rganadilar.</span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--green)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '2px' }}>Kichik guruhlar</strong>
                <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Har bir sinfda ko‘pi bilan 18-20 nafar o‘quvchi bo‘ladi, bu sifatli ta’lim kafolati.</span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--green)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '2px' }}>Kengaytirilgan infratuzilma</strong>
                <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Zamonaviy kompyuter xonalari, robototexnika laboratoriyasi, sport zali.</span>
              </div>
            </li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/" style={{ background: 'var(--navy)', color: '#fff', padding: '14px 30px', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block', boxShadow: 'var(--shadow-md)' }}>
            Qabulga yozilish
          </a>
        </div>
      </div>
    </>
  );
}
