import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Music2, Search, Download, Copy, ArrowLeft, RotateCcw } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import useAuth from '../../hooks/useAuth';
import { brand } from '../../utils/theme';

// ——— SVG іконки ———
const IgSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const TtSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
  </svg>
);
const LiSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const XSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const platformsList = [
  { id: 'ig', name: 'Instagram',   icon: <IgSvg />, iconSm: <IgSvg size={14} />, dot: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' },
  { id: 'tt', name: 'TikTok',      icon: <TtSvg />, iconSm: <TtSvg size={14} />, dot: '#010101', bg: '#010101' },
  { id: 'li', name: 'LinkedIn',    icon: <LiSvg />, iconSm: <LiSvg size={14} />, dot: '#0077b5', bg: '#0077b5' },
  { id: 'tw', name: 'X (Twitter)', icon: <XSvg />,  iconSm: <XSvg size={14} />,  dot: '#000',    bg: '#000' },
];

const tones = ['Інформативний', 'Емоційний', 'Розважальний', 'Зухвалий'];
const allTracks = [
  { id: 1, name: 'Lo-fi Chill Morning',  dur: '2:34' },
  { id: 2, name: 'Ambient Focus',         dur: '3:12' },
  { id: 3, name: 'Motivational Rise',     dur: '1:58' },
  { id: 4, name: 'Deep Work Beats',       dur: '4:01' },
  { id: 5, name: 'Soft Piano Vibes',      dur: '2:50' },
  { id: 6, name: 'Morning Motivation',    dur: '3:22' },
];
const allFormats = ['Квадрат 1:1', 'Портрет 4:5', 'Горизонталь 16:9'];

// ——— ProgressBar ———
const stepLabels = ['Відео та платформи', 'Налаштування', 'Огляд'];
const ProgressBar = ({ current }) => (
  <div className="flex items-center justify-center border-b border-black/5 sticky top-14.5 z-40"
    style={{ padding: '14px 40px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
    {stepLabels.map((label, i) => {
      const state = i < current ? 'done' : i === current ? 'active' : 'idle';
      return (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={state === 'idle' ? { background: 'rgba(0,0,0,0.06)', color: '#bbb' } : { background: brand.gradient, color: 'white', boxShadow: state === 'active' ? '0 4px 12px rgba(214,51,132,0.3)' : 'none' }}>
              {state === 'done' ? <Check size={11} strokeWidth={3} /> : i + 1}
            </div>
            <span className="text-xs whitespace-nowrap" style={{ fontWeight: state === 'active' ? 600 : 500, color: state === 'active' ? '#1A1A1A' : state === 'done' ? '#D63384' : '#bbb' }}>
              {label}
            </span>
          </div>
          {i < stepLabels.length - 1 && (
            <div className="mx-2 h-px shrink-0" style={{ width: 48, background: state === 'done' ? brand.gradient : 'rgba(0,0,0,0.1)' }} />
          )}
        </div>
      );
    })}
  </div>
);

// ——— Blobs ———
const Blobs = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute rounded-full" style={{ width: 460, height: 460, background: '#f48fb1', top: -140, right: -80, opacity: .18, filter: 'blur(110px)' }} />
    <div className="absolute rounded-full" style={{ width: 340, height: 340, background: '#F5C842', bottom: -60, left: '10%', opacity: .12, filter: 'blur(110px)' }} />
    <div className="absolute rounded-full" style={{ width: 260, height: 260, background: '#E8799A', top: '40%', right: '15%', opacity: .09, filter: 'blur(110px)' }} />
  </div>
);

// ——— CopyButton ———
const CopyButton = ({ text, small = false }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 rounded-full border transition-all"
      style={{ padding: small ? '4px 10px' : '6px 13px', fontSize: 11, fontFamily: "'Onest', sans-serif", fontWeight: 500, background: copied ? 'rgba(76,175,80,0.08)' : 'rgba(255,255,255,0.5)', border: copied ? '0.5px solid rgba(76,175,80,0.3)' : '0.5px solid rgba(0,0,0,0.1)', color: copied ? '#2e7d32' : '#666' }}>
      {copied ? <Check size={10} strokeWidth={3} /> : <Copy size={10} />}
      {copied ? 'Скопійовано' : 'Копіювати'}
    </button>
  );
};

// ——— Step 1 ———
const Step1 = ({ url, setUrl, videoLoaded, setVideoLoaded, selected, togglePlatform, onNext }) => {
  const handleLoad = () => { if (url.trim()) setVideoLoaded(true); };
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-10 py-10">
      <p className="text-2xl font-extrabold tracking-tight mb-1.5">Новий mist</p>
      <p className="text-sm text-[#aaa] mb-8">Вставте посилання на YouTube відео і оберіть платформи</p>
      <div className="rounded-2xl p-6 border border-white/80 mb-4" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(20px)', boxShadow: '0 6px 24px rgba(0,0,0,0.05)' }}>
        <p className="text-xs font-semibold text-[#666] mb-2 tracking-wide">YouTube посилання</p>
        <div className="flex gap-2.5">
          <input value={url} onChange={e => { setUrl(e.target.value); if (!e.target.value.trim()) setVideoLoaded(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLoad()} type="text" placeholder="https://youtube.com/watch?v=..."
            className="flex-1 px-4 py-3 rounded-xl border border-black/9 text-sm outline-none placeholder-[#ccc]"
            style={{ background: 'rgba(255,255,255,0.7)', fontFamily: "'Onest', sans-serif" }} />
          <button onClick={handleLoad} className="px-5 py-3 rounded-xl text-white text-sm font-semibold shrink-0 hover:-translate-y-px transition-all"
            style={{ background: brand.gradient, boxShadow: brand.shadow }}>Завантажити</button>
        </div>
      </div>
      {videoLoaded && (
        <div className="rounded-2xl p-4 border border-white/80 mb-4 flex gap-4 items-center" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(20px)', boxShadow: '0 6px 24px rgba(0,0,0,0.05)' }}>
          <div className="w-36 h-20 rounded-xl shrink-0 relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
            <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(to top,rgba(0,0,0,.5),transparent)' }} />
            <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center relative z-10" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold mb-1 leading-snug">Як запустити стартап з нуля у 2025 — повний гайд</p>
            <p className="text-xs text-[#aaa] mb-2">Максим Коваль · 48K переглядів · 18:24</p>
            <div className="flex gap-1.5 flex-wrap">
              {['бізнес', 'стартап', 'підприємництво'].map(t => (
                <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-medium text-[#D63384]" style={{ background: 'rgba(232,121,154,0.10)', border: '0.5px solid rgba(232,121,154,0.25)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Відео знайдено
          </div>
        </div>
      )}
      <div className="rounded-2xl p-6 border border-white/80 mb-6" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(20px)', boxShadow: '0 6px 24px rgba(0,0,0,0.05)' }}>
        <p className="text-xs font-semibold text-[#666] mb-4 tracking-wide">Оберіть платформи для генерації</p>
        <div className="grid grid-cols-4 gap-2.5">
          {platformsList.map(p => {
            const isSelected = selected.has(p.id);
            return (
              <button key={p.id} onClick={() => togglePlatform(p.id)}
                className="relative rounded-2xl py-3.5 px-3 flex flex-col items-center gap-2 transition-all hover:-translate-y-px"
                style={{ border: isSelected ? '1.5px solid #D63384' : '1.5px solid rgba(0,0,0,0.08)', background: isSelected ? 'rgba(232,121,154,0.08)' : 'rgba(255,255,255,0.5)' }}>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: brand.gradient }}>
                    <Check size={8} strokeWidth={3} color="white" />
                  </div>
                )}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: p.bg }}>{p.icon}</div>
                <span className="text-xs font-semibold text-[#444]">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#ccc]">Обрано платформ: <span className="text-[#D63384] font-semibold">{selected.size}</span></p>
        <button onClick={onNext} disabled={selected.size === 0}
          className="px-8 py-3 rounded-full text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: brand.gradient, boxShadow: brand.shadow }}>Далі</button>
      </div>
    </div>
  );
};

// ——— ResultText with edit ———
const ResultText = ({ initialText, initialHashtags }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [hashtags, setHashtags] = useState(initialHashtags);
  const [draft, setDraft] = useState({ text, hashtags });
  const handleSave = () => { setText(draft.text); setHashtags(draft.hashtags); setEditing(false); };
  return (
    <div className="rounded-xl p-4 border border-white/80 mb-3" style={{ background: 'rgba(255,255,255,0.5)' }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest">Текст поста</p>
        <div className="flex items-center gap-2">
          {!editing
            ? <>
                <CopyButton text={`${text}\n\n${hashtags}`} small />
                <button onClick={() => { setDraft({ text, hashtags }); setEditing(true); }} className="text-xs text-[#D63384] font-medium hover:underline">Редагувати</button>
              </>
            : <button onClick={handleSave} className="text-xs text-white font-semibold px-3 py-1 rounded-full" style={{ background: brand.gradient }}>Зберегти зміни</button>
          }
        </div>
      </div>
      {editing ? (
        <>
          <textarea value={draft.text} onChange={e => setDraft(d => ({ ...d, text: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-black/9 text-xs outline-none resize-none mb-2"
            style={{ height: 90, background: 'rgba(255,255,255,0.8)', fontFamily: "'Onest', sans-serif", lineHeight: 1.6 }} />
          <textarea value={draft.hashtags} onChange={e => setDraft(d => ({ ...d, hashtags: e.target.value }))}
            placeholder="#хештеги через пробіл..."
            className="w-full px-3 py-2 rounded-xl border border-black/9 text-xs outline-none resize-none"
            style={{ height: 48, background: 'rgba(255,255,255,0.8)', fontFamily: "'Onest', sans-serif", color: '#D63384' }} />
        </>
      ) : (
        <>
          <p className="text-xs text-[#1A1A1A] leading-relaxed mb-2">{text}</p>
          <div className="flex flex-wrap gap-1.5">
            {hashtags.split(' ').filter(Boolean).map(h => (
              <span key={h} className="px-2 py-0.5 rounded-full text-xs font-medium text-[#D63384]" style={{ background: 'rgba(232,121,154,0.10)' }}>{h}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ——— Step 2 ———
const Step2 = ({ selected, results, setResults, onNext, onBack, editingPlatformId, setEditingPlatformId }) => {
  const selectedPlatforms = platformsList.filter(p => selected.has(p.id));

  // If coming back to edit a specific platform, start there
  const startIdx = editingPlatformId ? selectedPlatforms.findIndex(p => p.id === editingPlatformId) : 0;
  const [activePlatformIdx, setActivePlatformIdx] = useState(startIdx >= 0 ? startIdx : 0);
  const [donePlatforms, setDonePlatforms] = useState(editingPlatformId ? new Set(selectedPlatforms.map(p => p.id).filter(id => id !== editingPlatformId)) : new Set());
  const [tone, setTone] = useState('Інформативний');
  const [customOn, setCustomOn] = useState(false);
  const [photoTab, setPhotoTab] = useState(0);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [activeFormats, setActiveFormats] = useState(new Set(['Квадрат 1:1', 'Портрет 4:5']));
  const [trackSearch, setTrackSearch] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(1);
  const [generated, setGenerated] = useState(!!editingPlatformId);
  const fileInputRef = useRef(null);

  const activePlatform = selectedPlatforms[activePlatformIdx];
  const isLast = activePlatformIdx === selectedPlatforms.length - 1;
  const filteredTracks = allTracks.filter(t => t.name.toLowerCase().includes(trackSearch.toLowerCase()));

  const toggleFormat = (f) => {
    setActiveFormats(prev => { const next = new Set(prev); if (next.has(f)) { if (next.size === 1) return prev; next.delete(f); } else next.add(f); return next; });
  };

  const handleGenerate = () => {
    // Save result for this platform
    setResults(prev => ({
      ...prev,
      [activePlatform.id]: {
        text: 'Мрієте про власний бізнес, але не знаєте з чого почати? 🚀 Від ідеї до першого клієнта — покроково і без зайвої води.',
        hashtags: '#стартап #бізнес #підприємництво #успіх #мотивація',
        track: allTracks.find(t => t.id === selectedTrack),
        formats: [...activeFormats],
      }
    }));
    setGenerated(true);
  };

  const handleSaveAndNext = () => {
    setDonePlatforms(prev => new Set([...prev, activePlatform.id]));
    if (editingPlatformId) {
      // came from review — go back to review
      setEditingPlatformId(null);
      onNext();
    } else if (isLast) {
      onNext();
    } else {
      setActivePlatformIdx(i => i + 1);
      setGenerated(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col" style={{ minHeight: 'calc(100vh - 115px)' }}>
      {/* Platform tabs */}
      <div className="flex items-center gap-2 border-b border-black/5 sticky z-40"
        style={{ top: 115, padding: '12px 24px', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(10px)' }}>
        {selectedPlatforms.map((p, i) => {
          const isDone = donePlatforms.has(p.id);
          const isActive = i === activePlatformIdx;
          return (
            <button key={p.id} onClick={() => { setActivePlatformIdx(i); setGenerated(donePlatforms.has(p.id) || !!results[p.id]); }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all"
              style={isDone ? { background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)', color: '#2e7d32' }
                : isActive ? { background: 'rgba(232,121,154,0.10)', border: '1px solid rgba(214,51,132,0.3)', color: '#D63384', fontWeight: 600 }
                : { background: 'transparent', border: '1px solid rgba(0,0,0,0.08)', color: '#888' }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.dot }} />
              {p.name}
              {isDone && <Check size={10} strokeWidth={3} />}
            </button>
          );
        })}
        <ChevronRight size={14} className="text-[#ccc] ml-auto" />
      </div>

      {/* Split */}
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Left */}
        <div className="p-6 border-r border-black/6 overflow-y-auto">
          <p className="text-base font-extrabold tracking-tight mb-1">{activePlatform.name}</p>
          <p className="text-xs text-[#bbb] mb-5">Налаштуйте контент для цієї платформи</p>

          {/* Tone */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">Тон тексту</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {tones.map(t => (
                <button key={t} onClick={() => { setTone(t); setCustomOn(false); }}
                  className="px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all"
                  style={tone === t && !customOn ? { background: 'rgba(232,121,154,0.10)', border: '1px solid #D63384', color: '#D63384', fontWeight: 600 } : { background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.1)', color: '#666' }}>{t}</button>
              ))}
            </div>
            <button onClick={() => setCustomOn(v => !v)} className="flex items-center gap-2 text-xs text-[#aaa] mb-2 cursor-pointer">
              <div className="w-7 h-4 rounded-full relative transition-all shrink-0" style={{ background: customOn ? brand.gradient : 'rgba(0,0,0,0.12)' }}>
                <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" style={{ left: customOn ? 14 : 2 }} />
              </div>
              Кастомний промпт
            </button>
            {customOn && (
              <textarea placeholder="Опишіть бажаний стиль тексту..."
                className="w-full px-3 py-2.5 rounded-xl border border-black/9 text-xs outline-none resize-none placeholder-[#ccc]"
                style={{ height: 64, background: 'rgba(255,255,255,0.6)', fontFamily: "'Onest', sans-serif" }} />
            )}
          </div>

          {/* Photo */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">Фото</p>
            <div className="flex border border-black/9 rounded-xl overflow-hidden mb-3">
              {['YouTube thumbnail', 'Завантажити', 'AI генерація'].map((tab, i) => (
                <button key={tab} onClick={() => setPhotoTab(i)}
                  className="flex-1 py-2 text-xs font-medium transition-all border-r border-black/8 last:border-r-0"
                  style={photoTab === i ? { background: 'rgba(232,121,154,0.10)', color: '#D63384', fontWeight: 600 } : { background: 'rgba(255,255,255,0.5)', color: '#888' }}>{tab}</button>
              ))}
            </div>
            <div className="rounded-xl border border-black/9 p-4" style={{ background: 'rgba(255,255,255,0.4)' }}>
              {photoTab === 0 && (
                <>
                  <div className="flex gap-2 mb-2">
                    {['linear-gradient(135deg,#1a1a2e,#0f3460)', 'linear-gradient(135deg,#2d1020,#c9184a)'].map((bg, i) => (
                      <div key={i} className="relative rounded-lg cursor-pointer" style={{ width: 72, height: 48, background: bg }}>
                        {i === 0 && <div className="absolute inset-0 rounded-lg flex items-center justify-center" style={{ background: 'rgba(214,51,132,0.35)' }}><Check size={14} color="white" strokeWidth={3} /></div>}
                      </div>
                    ))}
                    <div className="rounded-lg border border-dashed border-black/15 flex items-center justify-center text-[#ccc] text-lg cursor-pointer" style={{ width: 72, height: 48 }}>+</div>
                  </div>
                  <p className="text-xs text-[#bbb]">Оберіть thumbnail для поста</p>
                </>
              )}
              {photoTab === 1 && (
                <>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={e => { const f = e.target.files?.[0]; if (f) setUploadedPhoto(URL.createObjectURL(f)); }} className="hidden" />
                  {uploadedPhoto
                    ? <div className="flex items-center gap-3"><img src={uploadedPhoto} alt="uploaded" className="w-20 h-14 object-cover rounded-lg" /><button onClick={() => fileInputRef.current?.click()} className="text-xs text-[#D63384] font-medium hover:underline">Замінити</button></div>
                    : <button onClick={() => fileInputRef.current?.click()} className="w-full flex flex-col items-center justify-center py-5 rounded-xl border border-dashed border-black/15 hover:border-[#D63384]/30 transition-colors cursor-pointer"><p className="text-2xl mb-1">📎</p><p className="text-xs text-[#bbb]">Клікніть щоб вибрати фото</p></button>
                  }
                </>
              )}
              {photoTab === 2 && (
                <div>
                  <input placeholder="Опишіть бажане зображення..." className="w-full px-3 py-2 rounded-lg border border-black/9 text-xs outline-none mb-2 placeholder-[#ccc]" style={{ background: 'rgba(255,255,255,0.7)', fontFamily: "'Onest', sans-serif" }} />
                  <button className="px-4 py-2 rounded-full text-white text-xs font-semibold hover:-translate-y-px transition-all" style={{ background: brand.gradient, boxShadow: brand.shadow }}>Згенерувати</button>
                </div>
              )}
            </div>
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mt-3 mb-2">Формати</p>
            <div className="flex gap-2 flex-wrap">
              {allFormats.map(f => (
                <button key={f} onClick={() => toggleFormat(f)}
                  className="px-3 py-1 rounded-full border text-xs font-medium transition-all"
                  style={activeFormats.has(f) ? { background: 'rgba(232,121,154,0.10)', border: '1px solid rgba(214,51,132,0.3)', color: '#D63384' } : { background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)', color: '#666' }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Track */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">Музичний трек (Pixabay)</p>
            <div className="flex gap-2 mb-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-black/9" style={{ background: 'rgba(255,255,255,0.6)' }}>
                <Search size={12} className="text-[#ccc] shrink-0" />
                <input value={trackSearch} onChange={e => setTrackSearch(e.target.value)} placeholder="Пошук треку..." className="flex-1 outline-none bg-transparent text-xs placeholder-[#ccc]" style={{ fontFamily: "'Onest', sans-serif" }} />
              </div>
              <button className="px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333] transition-colors">Знайти</button>
            </div>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
              {filteredTracks.length === 0
                ? <p className="text-xs text-[#ccc] text-center py-3">Нічого не знайдено</p>
                : filteredTracks.map(t => (
                  <button key={t.id} onClick={() => setSelectedTrack(t.id)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all text-left"
                    style={selectedTrack === t.id ? { background: 'rgba(245,200,66,0.10)', border: '1px solid rgba(245,200,66,0.4)' } : { background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.07)' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#fffde7,#ffe082)' }}><Music2 size={12} className="text-yellow-600" /></div>
                    <span className="text-xs font-semibold text-[#1A1A1A] flex-1">{t.name}</span>
                    <span className="text-xs text-[#bbb]">{t.dur}</span>
                  </button>
                ))
              }
            </div>
          </div>

          <button onClick={handleGenerate}
            className="w-full py-3 rounded-full text-white text-sm font-semibold hover:-translate-y-0.5 transition-all mt-2"
            style={{ background: brand.gradient, boxShadow: brand.shadow }}>
            Згенерувати для {activePlatform.name}
          </button>
        </div>

        {/* Right */}
        <div className="p-6 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.18)' }}>
          {!generated ? (
            <div className="flex flex-col items-center justify-center h-full min-h-72 text-center text-[#ccc]">
              <div className="text-3xl mb-3 opacity-50">✦</div>
              <p className="text-sm font-medium">Результат з'явиться тут</p>
              <p className="text-xs mt-1 opacity-70">Натисніть "Згенерувати" щоб побачити пост</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-bold mb-4">Результат для {activePlatform.name}</p>
              <ResultText
                initialText="Мрієте про власний бізнес, але не знаєте з чого почати? 🚀 Від ідеї до першого клієнта — покроково і без зайвої води."
                initialHashtags="#стартап #бізнес #підприємництво #успіх #мотивація"
              />
              <div className="rounded-xl p-4 border border-white/80 mb-3" style={{ background: 'rgba(255,255,255,0.5)' }}>
                <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest mb-3">Фото</p>
                <div className="flex gap-2">
                  {[{ w: 80, h: 80, label: '1:1' }, { w: 64, h: 80, label: '4:5' }].filter(f => activeFormats.has(f.label === '1:1' ? 'Квадрат 1:1' : 'Портрет 4:5')).map(f => (
                    <div key={f.label} className="relative rounded-xl overflow-hidden" style={{ width: f.w, height: f.h, background: 'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
                      <span className="absolute bottom-1 left-0 right-0 text-center text-white/80 font-semibold" style={{ fontSize: 9 }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-4 border border-white/80 mb-5" style={{ background: 'rgba(255,255,255,0.5)' }}>
                <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest mb-3">Трек</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#fffde7,#ffe082)' }}><Music2 size={14} className="text-yellow-600" /></div>
                  <div>
                    <p className="text-xs font-semibold">{allTracks.find(t => t.id === selectedTrack)?.name}</p>
                    <p className="text-xs text-[#aaa]">Pixabay · {allTracks.find(t => t.id === selectedTrack)?.dur}</p>
                  </div>
                </div>
              </div>

              {/* Save button */}
              <button onClick={handleSaveAndNext}
                className="w-full py-3 rounded-full text-white text-sm font-semibold hover:-translate-y-0.5 transition-all"
                style={{ background: editingPlatformId ? brand.gradient : '#1A1A1A', boxShadow: editingPlatformId ? brand.shadow : 'none' }}>
                {editingPlatformId
                  ? 'Зберегти зміни і повернутись до огляду'
                  : isLast ? 'Зберегти і перейти до огляду' : `Зберегти і далі → ${selectedPlatforms[activePlatformIdx + 1]?.name}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ——— Step 3 — Review ———
const Step3 = ({ selected, results, videoTitle, onEditPlatform, onBack, onSave }) => {
  const selectedPlatforms = platformsList.filter(p => selected.has(p.id));
  const [activePlatform, setActivePlatform] = useState(selectedPlatforms[0]?.id);
  const platform = selectedPlatforms.find(p => p.id === activePlatform);
  const result = results[activePlatform] || {};

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-10 py-8">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-[#888] hover:text-[#1A1A1A] mb-2 transition-colors bg-transparent border-none cursor-pointer">
            <ArrowLeft size={12} /> Назад до налаштувань
          </button>
          <p className="text-xl font-extrabold tracking-tight mb-1">Огляд генерації</p>
          <p className="text-xs text-[#bbb]">{selectedPlatforms.length} платформи · Перевірте результат перед збереженням</p>
        </div>
        <button onClick={onSave}
          className="px-6 py-2.5 rounded-full text-white text-sm font-semibold shrink-0 hover:-translate-y-px transition-all"
          style={{ background: brand.gradient, boxShadow: brand.shadow }}>
          Зберегти mist
        </button>
      </div>

      {/* Video ref */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/80 mb-6"
        style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(16px)', boxShadow: '0 3px 12px rgba(0,0,0,0.04)' }}>
        <div className="w-16 h-10 rounded-lg shrink-0 relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <p className="text-sm font-bold text-[#1A1A1A]">{videoTitle || 'Як запустити стартап з нуля у 2025 — повний гайд'}</p>
          <p className="text-xs text-[#aaa]">Максим Коваль · 48K переглядів · 18:24</p>
        </div>
      </div>

      {/* Platform tabs */}
      <div className="flex gap-2 mb-5">
        {selectedPlatforms.map(p => (
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

      {/* Platform result card */}
      {platform && (
        <div className="rounded-2xl overflow-hidden border border-white/80"
          style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(18px)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>

          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: platform.bg }}>{platform.iconSm}</div>
              <span className="text-sm font-bold text-[#1A1A1A]">{platform.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onEditPlatform(platform.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all hover:-translate-y-px"
                style={{ border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.5)', color: '#666' }}>
                <RotateCcw size={11} /> Змінити налаштування
              </button>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5 grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* Text full width */}
            <div className="col-span-2 rounded-xl p-4 border border-white/80" style={{ background: 'rgba(255,255,255,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest">Текст поста</p>
                <CopyButton text={result.text || ''} small />
              </div>
              <p className="text-xs text-[#1A1A1A] leading-relaxed mb-2">
                {result.text || 'Мрієте про власний бізнес, але не знаєте з чого почати? 🚀 Від ідеї до першого клієнта — покроково і без зайвої води.'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(result.hashtags || '#стартап #бізнес #підприємництво').split(' ').filter(Boolean).map(h => (
                  <span key={h} className="px-2 py-0.5 rounded-full text-xs font-medium text-[#D63384]" style={{ background: 'rgba(232,121,154,0.10)' }}>{h}</span>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div className="rounded-xl p-4 border border-white/80" style={{ background: 'rgba(255,255,255,0.5)' }}>
              <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest mb-3">Фото</p>
              <div className="flex gap-2.5 items-end flex-wrap">
                {[{ w: 72, h: 72, label: '1:1' }, { w: 58, h: 72, label: '4:5' }].map(f => (
                  <div key={f.label} className="flex flex-col items-center gap-1.5">
                    <div className="relative rounded-xl group cursor-pointer overflow-hidden" style={{ width: f.w, height: f.h, background: 'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        <Download size={14} color="white" />
                      </div>
                    </div>
                    <p className="text-xs text-[#bbb] font-medium" style={{ fontSize: 9 }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Track */}
            <div className="rounded-xl p-4 border border-white/80" style={{ background: 'rgba(255,255,255,0.5)' }}>
              <p className="text-xs font-bold text-[#ccc] uppercase tracking-widest mb-3">Трек</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#fffde7,#ffe082)' }}>
                  <Music2 size={14} className="text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{result.track?.name || 'Lo-fi Chill Morning'}</p>
                  <p className="text-xs text-[#aaa]">Pixabay · {result.track?.dur || '2:34'}</p>
                </div>
                <button className="px-3 py-1.5 rounded-full border border-black/10 text-xs font-medium text-[#888] hover:text-[#D63384] hover:border-[#D63384]/20 transition-colors shrink-0">
                  Завантажити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ——— WizardPage ———
const WizardPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selected, setSelected] = useState(new Set(['ig', 'tt']));
  const [results, setResults] = useState({});
  const [editingPlatformId, setEditingPlatformId] = useState(null);

  const togglePlatform = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size === 1) return prev; next.delete(id); }
      else next.add(id);
      return next;
    });
  };

  const handleEditPlatform = (platformId) => {
    setEditingPlatformId(platformId);
    setStep(1);
  };

  const handleSaveMist = () => {
    navigate('/mist/1');
  };

  return (
    <div className="min-h-screen" style={{ background: '#FDFAF7', fontFamily: "'Onest', sans-serif", color: '#1A1A1A' }}>
      <Blobs />
      <Navbar variant="wizard" />
      <ProgressBar current={step} />

      {step === 0 && (
        <Step1 url={url} setUrl={setUrl} videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded}
          selected={selected} togglePlatform={togglePlatform} onNext={() => setStep(1)} />
      )}
      {step === 1 && (
        <Step2 selected={selected} results={results} setResults={setResults}
          onNext={() => setStep(2)} onBack={() => setStep(0)}
          editingPlatformId={editingPlatformId} setEditingPlatformId={setEditingPlatformId} />
      )}
      {step === 2 && (
        <Step3 selected={selected} results={results} videoTitle={url}
          onEditPlatform={handleEditPlatform}
          onBack={() => setStep(1)}
          onSave={handleSaveMist} />
      )}
    </div>
  );
};

export default WizardPage;
