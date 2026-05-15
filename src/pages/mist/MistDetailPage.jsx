import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, Check, Music2, Plus } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { brand } from '../../utils/theme';
import Navbar from '../../components/layout/Navbar';

// ——— SVG іконки платформ ———
const IgSvg = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const TtSvg = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
  </svg>
);

// ——— Дані (потім підключимо з бека) ———
const mistData = {
  id: 1,
  title: 'Як запустити стартап з нуля у 2025',
  date: '14 травня 2026',
  videoBg: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
  videoTitle: 'Як запустити стартап з нуля у 2025 — повний гайд для початківців',
  videoMeta: 'Максим Коваль · Business UA · 48K переглядів · 18:24',
  platforms: [
    {
      id: 'ig',
      name: 'Instagram',
      icon: <IgSvg />,
      iconBg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)',
      dot: 'linear-gradient(135deg,#f09433,#bc1888)',
      text: 'Мрієте про власний бізнес, але не знаєте з чого почати? Я зібрав усе що потрібно знати підприємцю-початківцю в одному відео. Від ідеї до першого клієнта — покроково і без зайвої води. Посилання в шапці профілю!',
      hashtags: ['#стартап', '#бізнес', '#підприємництво', '#успіх', '#мотивація', '#youtube'],
      photos: [
        { w: 72, h: 72, label: '1:1 Квадрат', bg: 'linear-gradient(135deg,#1a1a2e,#0f3460)' },
        { w: 58, h: 72, label: '4:5 Портрет', bg: 'linear-gradient(135deg,#1a1a2e,#0f3460)' },
      ],
      track: { name: 'Lo-fi Chill Morning', dur: '2:34' },
    },
    {
      id: 'tt',
      name: 'TikTok',
      icon: <TtSvg />,
      iconBg: '#010101',
      dot: '#010101',
      text: 'Стартап з нуля? Реально! Ось що я б зробив по-іншому якби починав сьогодні 👇 Повний гайд на YouTube — посилання в біо.',
      hashtags: ['#startup', '#бізнес', '#тікток', '#підприємець', '#успіх'],
      photos: [
        { w: 46, h: 72, label: '9:16 Вертикаль', bg: 'linear-gradient(135deg,#1a1a2e,#c9184a)' },
      ],
      track: { name: 'Motivational Rise', dur: '1:58' },
    },
  ],
};

// ——— CopyButton ———
const CopyButton = ({ text, label = 'Копіювати все', small = false }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-full border transition-all"
      style={{
        padding: small ? '5px 11px' : '7px 14px',
        fontSize: small ? 11 : 12,
        fontFamily: "'Onest', sans-serif",
        fontWeight: 500,
        background: copied ? 'rgba(76,175,80,0.08)' : 'rgba(255,255,255,0.5)',
        border: copied ? '0.5px solid rgba(76,175,80,0.3)' : '0.5px solid rgba(0,0,0,0.1)',
        color: copied ? '#2e7d32' : '#666',
      }}>
      {copied ? <Check size={11} strokeWidth={3} /> : <Copy size={11} />}
      {copied ? 'Скопійовано' : label}
    </button>
  );
};

// ——— PlatformCard ———
const PlatformCard = ({ platform }) => (
  <div className="rounded-2xl overflow-hidden border border-white/80"
    style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(18px)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>

    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: platform.iconBg }}>
          {platform.icon}
        </div>
        <span className="text-sm font-bold text-[#1A1A1A]">{platform.name}</span>
      </div>
      <CopyButton text={`${platform.text}\n\n${platform.hashtags.join(' ')}`} />
    </div>

    {/* Body */}
    <div className="p-5 grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>

      {/* Text — full width */}
      <div className="col-span-2 rounded-xl p-4 border border-white/80"
        style={{ background: 'rgba(255,255,255,0.5)' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest">Текст поста</p>
          <CopyButton text={`${platform.text}\n\n${platform.hashtags.join(' ')}`} label="Копіювати" small />
        </div>
        <p className="text-xs text-[#1A1A1A] leading-relaxed mb-3">{platform.text}</p>
        <div className="flex flex-wrap gap-1.5">
          {platform.hashtags.map(h => (
            <span key={h} className="px-2 py-0.5 rounded-full text-xs font-medium text-[#D63384]"
              style={{ background: 'rgba(232,121,154,0.10)' }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div className="rounded-xl p-4 border border-white/80" style={{ background: 'rgba(255,255,255,0.5)' }}>
        <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest mb-3">Фото</p>
        <div className="flex gap-2.5 items-end flex-wrap">
          {platform.photos.map((photo, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="relative rounded-xl group cursor-pointer overflow-hidden"
                style={{ width: photo.w, height: photo.h, background: photo.bg }}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <Download size={14} color="white" />
                </div>
              </div>
              <p className="text-xs text-[#bbb] font-medium" style={{ fontSize: 9 }}>{photo.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Track */}
      <div className="rounded-xl p-4 border border-white/80" style={{ background: 'rgba(255,255,255,0.5)' }}>
        <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest mb-3">Трек</p>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg,#fffde7,#ffe082)' }}>
            <Music2 size={14} className="text-yellow-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#1A1A1A] truncate">{platform.track.name}</p>
            <p className="text-xs text-[#aaa]">Pixabay · {platform.track.dur}</p>
          </div>
          <button className="px-3 py-1.5 rounded-full border border-black/10 text-xs font-medium text-[#888] hover:text-[#D63384] hover:border-[#D63384]/20 transition-colors shrink-0">
            Завантажити
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ——— MistDetailPage ———
const MistDetailPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activePlatform, setActivePlatform] = useState(mistData.platforms[0].id);

  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'К';
  const platform = mistData.platforms.find(p => p.id === activePlatform);

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
      <div className="relative z-10 max-w-4xl mx-auto px-10 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <button onClick={() => navigate('/history')}
              className="flex items-center gap-1.5 text-xs text-[#888] hover:text-[#1A1A1A] mb-2 transition-colors border-none bg-transparent cursor-pointer">
              ← Назад до історії
            </button>
            <p className="text-xl font-extrabold tracking-tight text-[#1A1A1A] mb-1">{mistData.title}</p>
            <p className="text-xs text-[#bbb]">
              Збережено {mistData.date} · {mistData.platforms.length} платформи · {mistData.platforms.reduce((acc, p) => acc + p.photos.length, 0)} формати фото
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shrink-0 hover:-translate-y-px transition-all"
            style={{ background: '#1A1A1A' }}>
            <Download size={14} /> Завантажити ZIP
          </button>
        </div>

        {/* Video ref */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/80 mb-6"
          style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(16px)', boxShadow: '0 3px 12px rgba(0,0,0,0.04)' }}>
          <div className="w-20 h-12 rounded-lg shrink-0 relative flex items-center justify-center"
            style={{ background: mistData.videoBg }}>
            <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(to top,rgba(0,0,0,.4),transparent)' }} />
            <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center relative z-10"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg width="7" height="7" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-0.5">{mistData.videoTitle}</p>
            <p className="text-xs text-[#aaa]">{mistData.videoMeta}</p>
          </div>
        </div>

        {/* Platform tabs */}
        <div className="flex gap-2 mb-5">
          {mistData.platforms.map(p => (
            <button key={p.id} onClick={() => setActivePlatform(p.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all"
              style={activePlatform === p.id
                ? { background: 'rgba(232,121,154,0.10)', border: '1px solid rgba(214,51,132,0.3)', color: '#D63384', fontWeight: 600 }
                : { background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(0,0,0,0.08)', color: '#888' }
              }>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.dot }} />
              {p.name}
            </button>
          ))}
        </div>

        {/* Platform card */}
        {platform && <PlatformCard platform={platform} />}
      </div>
    </div>
  );
};

export default MistDetailPage;
