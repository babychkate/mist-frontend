import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Download, Music2, LayoutGrid, Play } from 'lucide-react';
import { SiInstagram, SiTiktok, SiX } from '@icons-pack/react-simple-icons';
import { brand } from '../../utils/theme';

const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

// ——— Дані ———
const steps = [
  { num: '1', title: 'Даєте лінк — ми робимо магію', desc: 'Просто вставте URL з YouTube, а Mist за мить витягне субтитри, сенси та метадані' },
  { num: '2', title: 'Обираєте вайб та формат', desc: 'Вибирайте соцмережі та тон голосу — від професійного до зухвалого. AI адаптує текст під кожну платформу' },
  { num: '3', title: 'Забираєте готовий контент', desc: 'Тексти, хештеги, музика та візуал вже чекають. Копіюйте окремо або завантажуйте все одним ZIP-архівом' },
];

const whoCards = [
  { icon: <Play size={18} />, name: 'YouTube блогер', desc: 'Публікуй відео — і одразу отримуй пости для всіх соцмереж автоматично' },
  { icon: <Zap size={18} />, name: 'Підприємець', desc: 'Просувай бізнес через відео без окремого SMM-спеціаліста у команді' },
  { icon: <Sparkles size={18} />, name: 'Контент-мейкер', desc: 'Адаптуй один відосик під усі платформи за хвилину без зайвих зусиль' },
  { icon: <LayoutGrid size={18} />, name: 'Маркетолог', desc: 'Масштабуй контент-стратегію без збільшення бюджету та команди' },
  { icon: <Music2 size={18} />, name: 'Музикант', desc: 'Просувай релізи та кліпи одразу на всіх платформах без зайвих витрат' },
  { icon: <Download size={18} />, name: 'Фрілансер', desc: 'Будуй особистий бренд без витрат на маркетинг і зайвого часу' },
];

const platforms = [
  { label: 'Instagram', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', icon: <SiInstagram color="white" size={15} /> },
  { label: 'TikTok', bg: '#010101', icon: <SiTiktok color="white" size={15} /> },
  { label: 'LinkedIn', bg: '#0077b5', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
  { label: 'X', bg: '#000', icon: <SiX color="white" size={15} /> },
];

// ——— Кнопка CTA ———
const CtaButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-8 py-4 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
    style={{ background: brand.gradient, boxShadow: brand.shadow }}
  >
    {children}
  </button>
);

// ——— Mock Card ———
const MockCard = () => (
  <div className="relative py-6 px-3.5">
    <div className="absolute top-0 right-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap z-10"
      style={{ background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(10px)', border: '0.5px solid rgba(255,255,255,0.9)', boxShadow: '0 6px 20px rgba(0,0,0,0.09)' }}>
      <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
      Генерую пост для Instagram...
    </div>

    <div className="rounded-3xl p-5"
      style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.95)', boxShadow: '0 20px 60px rgba(0,0,0,0.07)' }}>

      <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
        style={{ background: 'rgba(0,0,0,0.04)' }}>
        <div className="w-2 h-2 rounded-full bg-[#E8799A]" />
        <span className="text-xs text-[#aaa] flex-1">youtube.com/watch?v=abc123XyZ</span>
      </div>

      <div className="w-full h-28 rounded-xl overflow-hidden mb-3 relative flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
        <div className="absolute bottom-2 left-2 right-2 text-xs text-white/80 font-semibold leading-snug">
          Як запустити стартап з нуля у 2025 році — повний гайд
        </div>
        <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          <IconPlay />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3"
        style={{ background: 'rgba(245,200,66,0.10)', border: '0.5px solid rgba(245,200,66,0.35)' }}>
        <Music2 size={13} className="text-yellow-600 shrink-0" />
        <span className="text-xs text-yellow-800 font-medium flex-1">Lo-fi chill beat — підібрано AI</span>
        <div className="flex-1 h-0.5 rounded-full bg-yellow-200 overflow-hidden">
          <div className="w-2/5 h-full bg-yellow-400 rounded-full" />
        </div>
        <span className="text-xs text-yellow-700">0:42</span>
      </div>

      <div className="flex gap-2 mb-3">
        {[
          { label: 'Instagram', bg: '#fce4ec', color: '#c2185b', border: '#f48fb1' },
          { label: 'TikTok',    bg: '#f3e5f5', color: '#4a148c', border: '#ce93d8' },
          { label: 'LinkedIn',  bg: '#e3f2fd', color: '#0d47a1', border: '#90caf9' },
        ].map(c => (
          <span key={c.label} className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: c.bg, color: c.color, border: `0.5px solid ${c.border}` }}>
            {c.label}
          </span>
        ))}
      </div>

      <div className="w-full py-3 rounded-xl text-white text-xs font-semibold text-center flex items-center justify-center gap-1"
        style={{ background: brand.gradient }}>
        Згенерувати mist <Sparkles size={12} />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap"
      style={{ background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(10px)', border: '0.5px solid rgba(255,255,255,0.9)', boxShadow: '0 6px 20px rgba(0,0,0,0.09)' }}>
      <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
      <Sparkles size={10} className="text-purple-500" /> AI підібрав тон для LinkedIn
    </div>
  </div>
);

// ——— Головний компонент ———
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#FDFAF7', fontFamily: "'Onest', sans-serif", color: '#1A1A1A' }}>

      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, background: '#f48fb1', top: -180, right: -80, opacity: .2, filter: 'blur(90px)' }} />
        <div className="absolute rounded-full" style={{ width: 380, height: 380, background: '#F5C842', bottom: '15%', left: -120, opacity: .12, filter: 'blur(90px)' }} />
        <div className="absolute rounded-full" style={{ width: 280, height: 280, background: '#E8799A', top: '45%', right: '8%', opacity: .1, filter: 'blur(90px)' }} />
      </div>

      {/* Nav */}
      <nav className="flex justify-between items-center px-12 py-4 sticky top-0 z-50 border-b border-black/[0.07]"
        style={{ background: 'rgba(253,250,247,0.88)', backdropFilter: 'blur(14px)' }}>
        <div className="text-3xl font-extrabold tracking-tight bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent">
          mist
        </div>
        <div className="flex gap-3 items-center">
          <button 
  onClick={() => navigate('/login')}
  className="px-5 py-2 rounded-full border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200"
>
  Увійти
</button>

<button 
  onClick={() => navigate('/login')}
  className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-sm font-medium hover:bg-linear-to-br hover:from-[#E8799A] hover:to-[#D63384] transition-all duration-200"
>
  Почати
</button>
        </div>
      </nav>

      {/* Секція 1 — Hero */}
      <section className="relative z-10 min-h-[calc(100vh-57px)] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-12 py-12 grid grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#D63384] mb-5"
              style={{ background: 'rgba(232,121,154,0.12)', border: '0.5px solid rgba(232,121,154,0.3)' }}>
              <Sparkles size={11} /> AI-driven контент-асистент
            </div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tighter mb-4">
              Ваше відео.<br />
              <span className="bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent">
                Всі платформи.
              </span><br />
              За хвилину.
            </h1>
            <p className="text-base leading-relaxed text-[#555] mb-8">
              Автоматично генеруйте адаптовані пости, хештеги та візуал для Instagram, TikTok та LinkedIn. Ваш персональний AI-маркетолог завжди під рукою.
            </p>

            <CtaButton onClick={() => navigate('/login')}>
              Створіть свій перший mist
            </CtaButton>

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {['Безкоштовно', 'Без кредитної картки', 'Готово за хвилину'].map((t, i, arr) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="text-sm text-[#888]">{t}</span>
                  {i < arr.length - 1 && <span className="text-[#ccc]">·</span>}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-[#bbb] font-medium mr-1">Працює з</span>
              {platforms.map(p => (
                <div key={p.label} className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: p.bg }}>
                  {p.icon}
                </div>
              ))}
            </div>
          </div>

          <MockCard />
        </div>
      </section>

      {/* Секція 2 — Як це працює */}
      <section className="relative z-10 bg-white min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-12 py-16">
          <p className="text-center text-xs font-bold tracking-widest text-[#D63384] uppercase mb-2">Як це працює</p>
          <h2 className="text-center text-4xl font-extrabold tracking-tight mb-3">Три кроки до готового пакету</h2>
          <p className="text-center text-base text-[#888] mb-12 max-w-xl mx-auto leading-relaxed">
            Від посилання на відео до повного набору контенту для всіх платформ — без жодного зусилля з вашого боку
          </p>
          <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto">
            {steps.map(s => (
              <div key={s.num} className="rounded-3xl p-6 border border-black/[0.07] hover:-translate-y-1 transition-all hover:shadow-lg"
                style={{ background: '#FDFAF7' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-[#D63384] mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg,#fce4ec,#f48fb1)' }}>
                  {s.num}
                </div>
                <h3 className="text-sm font-bold text-center mb-2">{s.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed text-center">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секція 3 — Для кого */}
      <section className="relative z-10 bg-white min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-12 py-16">
          <p className="text-center text-xs font-bold tracking-widest text-[#D63384] uppercase mb-2">Для кого</p>
          <h2 className="text-center text-4xl font-extrabold tracking-tight mb-3">Mist для кожного хто створює</h2>
          <p className="text-center text-base text-[#888] mb-12 max-w-xl mx-auto leading-relaxed">
            Незалежно від вашої ніші — ми допоможемо масштабувати контент без зайвих витрат часу та грошей
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
            {whoCards.map(w => (
              <div key={w.name} className="rounded-3xl p-6 border border-black/[0.07] hover:-translate-y-1 transition-all hover:shadow-md hover:border-[#D63384]/20"
                style={{ background: '#FDFAF7' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-[#D63384]"
                  style={{ background: 'rgba(232,121,154,0.12)' }}>
                  {w.icon}
                </div>
                <h3 className="text-sm font-bold mb-1.5">{w.name}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секція 4 — Final CTA */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-12">
        <h2 className="text-5xl font-extrabold tracking-tighter bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent mb-4 leading-tight">
          Ваш наступний пост<br />уже майже готовий
        </h2>
        <p className="text-base text-[#888] mb-8 max-w-md leading-relaxed">
          Приєднуйтесь до тисяч контент-мейкерів які вже економлять години щотижня разом з Mist
        </p>
        <CtaButton onClick={() => navigate('/login')}>
          Створіть свій перший mist
        </CtaButton>
        <div className="mt-4 text-sm text-[#bbb]">Безкоштовно · Без кредитної картки · Готово за хвилину</div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex justify-between items-center px-12 py-5 border-t border-black/[0.07]">
        <div className="text-xl font-extrabold tracking-tight bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent">
          mist
        </div>
        <div className="text-xs text-[#bbb]">© 2026 Mist · Всі права захищені</div>
      </footer>
    </div>
  );
};

export default LandingPage;
