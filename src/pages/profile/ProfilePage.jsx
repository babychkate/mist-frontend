import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import useAuth from '../../hooks/useAuth';
import { brand } from '../../utils/theme';

// ——— SVG Instagram ———
const IgSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ——— Blobs ———
const Blobs = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute rounded-full" style={{ width: 460, height: 460, background: '#f48fb1', top: -140, right: -80, opacity: .18, filter: 'blur(110px)' }} />
    <div className="absolute rounded-full" style={{ width: 340, height: 340, background: '#F5C842', bottom: -60, left: '10%', opacity: .12, filter: 'blur(110px)' }} />
    <div className="absolute rounded-full" style={{ width: 260, height: 260, background: '#E8799A', top: '40%', right: '15%', opacity: .09, filter: 'blur(110px)' }} />
  </div>
);

// ——— Card ———
const Card = ({ children, className = '', danger = false }) => (
  <div className={`rounded-2xl p-6 border ${className}`}
    style={{
      background: 'rgba(255,255,255,0.45)',
      backdropFilter: 'blur(18px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      border: danger ? '1px solid rgba(220,38,38,0.15)' : '1px solid rgba(255,255,255,0.82)',
    }}>
    {children}
  </div>
);

// ——— FieldView ———
const FieldView = ({ label, value, muted = false }) => (
  <div className="mb-3">
    <p className="text-xs font-semibold text-[#bbb] uppercase tracking-widest mb-1.5">{label}</p>
    <div className="px-3.5 py-2.5 rounded-xl border border-black/8 text-sm"
      style={{ background: 'rgba(255,255,255,0.5)', color: muted ? '#bbb' : '#1A1A1A', fontWeight: muted ? 400 : 500 }}>
      {value}
    </div>
  </div>
);

// ——— FieldInput ———
const FieldInput = ({ label, ...props }) => (
  <div className="mb-3">
    <p className="text-xs font-semibold text-[#bbb] uppercase tracking-widest mb-1.5">{label}</p>
    <input
      className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#1A1A1A] outline-none"
      style={{
        border: '1px solid rgba(214,51,132,0.35)',
        background: 'rgba(255,255,255,0.8)',
        fontFamily: "'Onest', sans-serif",
        boxShadow: '0 0 0 3px rgba(214,51,132,0.07)',
      }}
      {...props}
    />
  </div>
);

// ——— ProfilePage ———
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || user?.fullName || 'Марія Петренко';
  const userEmail = user?.email || 'maria@example.com';
  const firstLetter = userName.charAt(0).toUpperCase();

  const [editingInfo, setEditingInfo] = useState(false);
  const [editingPass, setEditingPass] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [draftName, setDraftName] = useState(userName);
  const [draftEmail, setDraftEmail] = useState(userEmail);

  const handleSaveInfo = () => { setName(draftName); setEmail(draftEmail); setEditingInfo(false); };
  const handleCancelInfo = () => { setDraftName(name); setDraftEmail(email); setEditingInfo(false); };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen" style={{ background: '#FDFAF7', fontFamily: "'Onest', sans-serif", color: '#1A1A1A' }}>
      <Blobs />
      <Navbar variant="app" />

      <div className="relative z-10 max-w-3xl mx-auto px-10 py-8">
        <p className="text-xl font-extrabold tracking-tight mb-6">Профіль</p>

        {/* Avatar card */}
        <Card className="mb-4">
          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: brand.gradient }}>
                {firstLetter}
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center border-2 border-[#FDFAF7]">
                <Pencil size={9} color="white" />
              </div>
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-[#1A1A1A] mb-0.5">{name}</p>
              <p className="text-xs text-[#bbb]">З нами з 2 травня 2026 · 12 днів</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <Card className="mb-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { val: '24', label: 'Генерацій' },
              { val: '18', label: 'Відео' },
              { val: '12', label: 'Днів активності' },
              { val: '14', label: 'Остання генерація', sub: 'трав 2026' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center border border-white/80"
                style={{ background: 'rgba(255,255,255,0.5)' }}>
                <p className="text-xl font-extrabold tracking-tight text-[#1A1A1A] leading-none mb-1">{s.val}</p>
                <p className="text-xs text-[#bbb] font-medium leading-tight">{s.label}</p>
                {s.sub && <p className="text-xs font-semibold text-[#D63384] mt-0.5">{s.sub}</p>}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">

          {/* Personal info */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#1A1A1A]">Особисті дані</p>
              {!editingInfo && (
                <button onClick={() => { setDraftName(name); setDraftEmail(email); setEditingInfo(true); }}
                  className="text-xs text-[#D63384] font-medium hover:underline">
                  Редагувати
                </button>
              )}
            </div>
            {!editingInfo ? (
              <>
                <FieldView label="Ім'я" value={name} />
                <FieldView label="Email" value={email} />
              </>
            ) : (
              <>
                <FieldInput label="Ім'я" type="text" value={draftName} onChange={e => setDraftName(e.target.value)} />
                <FieldInput label="Email" type="email" value={draftEmail} onChange={e => setDraftEmail(e.target.value)} />
                <div className="flex gap-2 mt-1">
                  <button onClick={handleSaveInfo}
                    className="px-5 py-2 rounded-full text-white text-xs font-semibold"
                    style={{ background: brand.gradient }}>
                    Зберегти
                  </button>
                  <button onClick={handleCancelInfo}
                    className="px-5 py-2 rounded-full border border-black/10 text-xs text-[#888]">
                    Скасувати
                  </button>
                </div>
              </>
            )}
          </Card>

          {/* Password */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#1A1A1A]">Пароль</p>
              {!editingPass && (
                <button onClick={() => setEditingPass(true)}
                  className="text-xs text-[#D63384] font-medium hover:underline">
                  Змінити
                </button>
              )}
            </div>
            {!editingPass ? (
              <FieldView label="Поточний пароль" value="••••••••••••" muted />
            ) : (
              <>
                <FieldInput label="Поточний пароль" type="password" placeholder="Введіть поточний пароль" />
                <FieldInput label="Новий пароль" type="password" placeholder="Мінімум 8 символів" />
                <FieldInput label="Підтвердження" type="password" placeholder="Повторіть новий пароль" />
                <div className="flex gap-2 mt-1">
                  <button className="px-5 py-2 rounded-full text-white text-xs font-semibold"
                    style={{ background: brand.gradient }}>
                    Зберегти
                  </button>
                  <button onClick={() => setEditingPass(false)}
                    className="px-5 py-2 rounded-full border border-black/10 text-xs text-[#888]">
                    Скасувати
                  </button>
                </div>
              </>
            )}
          </Card>

          {/* Favorite platform */}
          <Card>
            <p className="text-sm font-bold text-[#1A1A1A] mb-4">Улюблена платформа</p>
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/80"
              style={{ background: 'rgba(255,255,255,0.5)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' }}>
                <IgSvg />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1A1A1A]">Instagram</p>
                <p className="text-xs text-[#bbb]">Використовується в 16 з 24 генерацій</p>
              </div>
              <div className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#D63384]"
                style={{ background: 'rgba(232,121,154,0.10)', border: '0.5px solid rgba(232,121,154,0.3)' }}>
                67%
              </div>
            </div>
          </Card>

          {/* Account */}
          <Card danger>
            <p className="text-sm font-bold text-[#1A1A1A] mb-4">Акаунт</p>
            <button onClick={handleLogout}
              className="w-full py-2.5 rounded-full border border-black/10 text-sm font-medium text-[#888] hover:bg-black/3 transition-colors mb-2">
              Вийти з акаунту
            </button>
            <button className="w-full py-2.5 rounded-full border text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              style={{ border: '1px solid rgba(220,38,38,0.2)' }}>
              Видалити акаунт
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
