import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { brand } from '../../utils/theme';
import Navbar from '../../components/layout/Navbar';

// ——— SVG іконки платформ ———
const IgIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const TtIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
  </svg>
);
const LiIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ——— Дані ———
const allMists = [
  {
    id: 1, month: 'Травень 2026',
    title: 'Як запустити стартап з нуля у 2025 — повний гайд',
    date: '14 трав', bg: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
    platforms: [
      { id: 'ig', icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
      { id: 'tt', icon: <TtIcon />, bg: '#010101' },
    ],
    track: 'Lo-fi Chill Morning',
  },
  {
    id: 2, month: 'Травень 2026',
    title: '5 помилок початківців у Python які я робив роками',
    date: '10 трав', bg: 'linear-gradient(135deg,#1b4332,#2d6a4f)',
    platforms: [
      { id: 'li', icon: <LiIcon />, bg: '#0077b5' },
      { id: 'ig', icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
    ],
    track: 'Deep Work Beats',
  },
  {
    id: 3, month: 'Травень 2026',
    title: 'Ранковий ритуал що змінив мою продуктивність',
    date: '7 трав', bg: 'linear-gradient(135deg,#4a1942,#c9184a)',
    platforms: [
      { id: 'ig', icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
      { id: 'tt', icon: <TtIcon />, bg: '#010101' },
    ],
    track: 'Morning Motivation',
  },
  {
    id: 4, month: 'Квітень 2026',
    title: 'Дизайн без дизайнера — топ інструменти 2025',
    date: '28 квіт', bg: 'linear-gradient(135deg,#1a3a4a,#0e6e8a)',
    platforms: [
      { id: 'ig', icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
    ],
    track: 'Creative Flow',
  },
  {
    id: 5, month: 'Квітень 2026',
    title: 'Як я заробив перші 10к фрілансом — чесна історія',
    date: '20 квіт', bg: 'linear-gradient(135deg,#2d1b69,#553c9a)',
    platforms: [
      { id: 'li', icon: <LiIcon />, bg: '#0077b5' },
      { id: 'ig', icon: <IgIcon />, bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
      { id: 'tt', icon: <TtIcon />, bg: '#010101' },
    ],
    track: 'Soft Piano Vibes',
  },
];

const filters = [
  { id: 'all', label: 'Всі' },
  { id: 'ig', label: 'Instagram', dot: 'linear-gradient(135deg,#f09433,#bc1888)' },
  { id: 'tt', label: 'TikTok', dot: '#010101' },
  { id: 'li', label: 'LinkedIn', dot: '#0077b5' },
];

// ——— HistoryCard ———
const HistoryCard = ({ mist, onClick }) => (
  <div onClick={ onClick } className="rounded-[18px] overflow-hidden border border-white/80 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl hover:border-[#D63384]/20"
    style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 14px rgba(0,0,0,0.05)' }}>
    <div className="w-full relative flex items-center justify-center" style={{ background: mist.bg, height: 90 }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,.55),transparent 60%)' }} />
      <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center relative z-10"
        style={{ background: 'rgba(255,255,255,0.18)' }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-xs text-white/85 font-medium"
        style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', fontSize: 9 }}>
        {mist.date}
      </div>
    </div>
    <div className="p-3">
      <p className="text-xs font-bold text-[#1A1A1A] leading-snug mb-1.5 line-clamp-2">{mist.title}</p>
      <div className="flex gap-1 mb-2">
        {mist.platforms.map((p, i) => (
          <div key={i} className="w-4 h-4 flex items-center justify-center" style={{ background: p.bg, borderRadius: 4 }}>
            {p.icon}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t border-black/5 pt-2">
        <div className="w-1 h-1 rounded-full bg-yellow-400 shrink-0" />
        <span className="text-xs text-[#aaa]">{mist.track}</span>
      </div>
    </div>
  </div>
);

// ——— HistoryPage ———
const HistoryPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'Користувач';

  const filtered = allMists.filter(m => {
    const matchFilter = activeFilter === 'all' || m.platforms.some(p => p.id === activeFilter);
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const months = [...new Set(filtered.map(m => m.month))];

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

        {/* Header */}
        <p className="text-xl font-extrabold tracking-tight text-[#1A1A1A] mb-0.5">Історія</p>
        <p className="text-xs text-[#bbb] mb-5">Всі ваші mists за весь час</p>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-medium transition-all"
              style={activeFilter === f.id
                ? { background: 'rgba(232,121,154,0.10)', border: '1px solid rgba(214,51,132,0.3)', color: '#D63384', fontWeight: 600 }
                : { background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.09)', color: '#888' }
              }>
              {f.dot && (
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: f.dot }} />
              )}
              {f.label}
            </button>
          ))}

          {/* Search */}
          <div className="ml-auto flex items-center gap-2 px-3 py-2 rounded-full border border-black/9"
            style={{ background: 'rgba(255,255,255,0.5)' }}>
            <Search size={13} className="text-[#ccc] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Пошук по назві..."
              className="outline-none bg-transparent text-xs text-[#1A1A1A] placeholder-[#ccc] w-40"
              style={{ fontFamily: "'Onest', sans-serif" }}
            />
          </div>
        </div>

        {/* Grouped by month */}
        {months.length === 0 ? (
          <p className="text-sm text-[#bbb] text-center mt-20">Нічого не знайдено</p>
        ) : (
          months.map(month => (
            <div key={month} className="mb-8">
              <p className="text-xs font-bold text-[#bbb] uppercase tracking-widest mb-3">{month}</p>
              <div className="grid grid-cols-4 gap-3">
                {filtered.filter(m => m.month === month).map(m => (
                  <HistoryCard key={m.id} mist={m} onClick={() => navigate(`/mist/${m.id}`)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
