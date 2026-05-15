import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { brand } from '../../utils/theme';
import Navbar from '../../components/layout/Navbar';

// ——— SVG іконки платформ ———
const IgIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const TtIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
  </svg>
);
const LiIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ——— Дані ———
const mists = [
  {
    id: 1,
    title: 'Як запустити стартап з нуля у 2025',
    date: '14 трав 2026',
    bg: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
    platforms: [
      { icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
      { icon: <TtIcon />, bg: '#010101' },
    ],
    tracks: ['Lo-fi Chill Morning', 'Ambient Focus'],
  },
  {
    id: 2,
    title: '5 помилок початківців у Python',
    date: '10 трав 2026',
    bg: 'linear-gradient(135deg,#1b4332,#2d6a4f)',
    platforms: [
      { icon: <LiIcon />, bg: '#0077b5' },
      { icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
    ],
    tracks: ['Deep Work Beats'],
  },
  {
    id: 3,
    title: 'Ранковий ритуал що змінив продуктивність',
    date: '7 трав 2026',
    bg: 'linear-gradient(135deg,#4a1942,#c9184a)',
    platforms: [
      { icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
      { icon: <TtIcon />, bg: '#010101' },
      { icon: <LiIcon />, bg: '#0077b5' },
    ],
    tracks: ['Morning Motivation', 'Soft Piano Vibes'],
  },
];

const activeDays = [2, 5, 7, 10, 14, 20, 23];
const today = 15;

const calDays = [
  { d: 28, other: true }, { d: 29, other: true }, { d: 30, other: true },
  { d: 1 }, { d: 2 }, { d: 3 }, { d: 4 },
  { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9 }, { d: 10 }, { d: 11 },
  { d: 12 }, { d: 13 }, { d: 14 }, { d: 15 }, { d: 16 }, { d: 17 }, { d: 18 },
  { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23 }, { d: 24 }, { d: 25 },
  { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30 }, { d: 31 }, { d: 1, other: true },
];

// ——— MistCard ———
const MistCard = ({ mist, onClick }) => (
  <div onClick={onClick} className="rounded-2xl overflow-hidden border border-white/70 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-[#D63384]/20"
    style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', boxShadow: '0 3px 12px rgba(0,0,0,0.04)' }}>
    <div className="w-full relative flex items-center justify-center" style={{ background: mist.bg, height: 72 }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,.55),transparent 60%)' }} />
      <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center relative z-10"
        style={{ background: 'rgba(255,255,255,0.18)' }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>
    <div className="p-2.5">
      <p className="text-xs font-semibold text-[#1A1A1A] leading-snug mb-1 line-clamp-2">{mist.title}</p>
      <p className="text-xs text-[#ccc] mb-1.5">{mist.date}</p>
      <div className="flex gap-1 mb-1.5">
        {mist.platforms.map((p, i) => (
          <div key={i} className="w-4 h-4 flex items-center justify-center"
            style={{ background: p.bg, borderRadius: 4 }}>
            {p.icon}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 border-t border-black/5 pt-1.5">
        {mist.tracks.map((t, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-[#aaa]">
            <div className="w-1 h-1 rounded-full bg-yellow-400 shrink-0" />
            {t}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ——— Calendar ———
const Calendar = () => (
  <div className="rounded-2xl p-4 border border-white/75"
    style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', boxShadow: '0 3px 12px rgba(0,0,0,0.04)' }}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-bold text-[#1A1A1A]">Травень 2026</span>
      <div className="flex gap-1">
        <button className="w-6 h-6 rounded-md border border-black/10 flex items-center justify-center text-[#aaa] hover:bg-black/4 transition-colors">
          <ChevronLeft size={12} />
        </button>
        <button className="w-6 h-6 rounded-md border border-black/10 flex items-center justify-center text-[#aaa] hover:bg-black/4 transition-colors">
          <ChevronRight size={12} />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-7 gap-0.5">
      {['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].map(d => (
        <div key={d} className="text-center text-xs font-semibold text-[#ccc] pb-1">{d}</div>
      ))}
      {calDays.map((item, i) => {
        const isToday = !item.other && item.d === today;
        const hasActivity = !item.other && activeDays.includes(item.d);
        return (
          <div key={i}
            className="relative flex items-center justify-center aspect-square rounded-md cursor-pointer transition-all hover:bg-black/4"
            style={
              isToday
                ? { background: brand.gradient }
                : hasActivity
                ? { background: 'rgba(232,121,154,0.15)' }
                : {}
            }>
            <span className={`text-xs leading-none ${
              isToday ? 'text-white font-bold' :
              item.other ? 'text-[#ddd]' :
              hasActivity ? 'text-[#D63384] font-bold' :
              'text-[#888]'
            }`}>
              {item.d}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// ——— DashboardPage ———
const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'Користувач';

  return (
    <div className="min-h-screen" style={{ background: '#FDFAF7', fontFamily: "'Onest', sans-serif", color: '#1A1A1A' }}>

      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 460, height: 460, background: '#f48fb1', top: -140, right: -80, opacity: .18, filter: 'blur(110px)' }} />
        <div className="absolute rounded-full" style={{ width: 340, height: 340, background: '#F5C842', bottom: -60, left: '10%', opacity: .12, filter: 'blur(110px)' }} />
        <div className="absolute rounded-full" style={{ width: 260, height: 260, background: '#E8799A', top: '40%', right: '15%', opacity: .09, filter: 'blur(110px)' }} />
      </div>

      <Navbar variant="app" />
      
      {/* Content */}
      <div className="relative z-1 px-10 py-6">

        {/* Greeting */}
        <p className="text-xl font-extrabold tracking-tight text-[#1A1A1A] mb-0.5">
          Вітаю, {userName}!
        </p>
        <p className="text-xs text-[#bbb] mb-5">Ваша статистика за весь час</p>

        {/* Stats — звужені */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: '24', label: 'Генерацій' },
            { val: '18', label: 'Відео оброблено' },
            { val: '12', label: 'Днів активності' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl px-4 py-3 border border-white/75"
              style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', boxShadow: '0 3px 12px rgba(0,0,0,0.04)' }}>
              <div className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] leading-none">{s.val}</div>
              <div className="text-xs text-[#bbb] mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main row */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 1fr' }}>
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-3">Останні mists</p>
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {mists.map(m => <MistCard key={m.id} mist={m} onClick={() => navigate(`/mist/${m.id}`)} />)}
            </div>
            <button className="w-full py-2.5 rounded-full border border-black/9 text-sm font-medium text-[#888] transition-all hover:text-[#D63384] hover:border-[#D63384]/20"
              style={{ background: 'rgba(255,255,255,0.4)' }} onClick={() => navigate('/history')}>
              Переглянути всі mists
            </button>
          </div>

          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-3">Календар активності</p>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
