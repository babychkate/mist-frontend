import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, RefreshCw, Sparkles, Mic, FileText, X, ShieldCheck } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuth from '../../hooks/useAuth';
import { loginRequest } from '../../api/auth.api';

const loginSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Мінімум 6 символів'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Мінімум 2 символи'),
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Мінімум 6 символів'),
});

const forgotSchema = z.object({
  email: z.string().email('Невірний формат email'),
});

// ——— Модалка Terms ———
const TermsModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
    onClick={onClose}>
    <div
      className="w-full max-w-md rounded-2xl p-7 relative max-h-[80vh] overflow-y-auto"
      style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}
      onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-[#bbb] hover:text-[#888] transition-colors">
        <X size={18} />
      </button>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'linear-gradient(135deg,#fce4ec,#f48fb1)' }}>
        <ShieldCheck size={20} className="text-[#D63384]" />
      </div>
      <h2 className="text-[18px] font-extrabold text-[#1A1A1A] mb-1">Умови використання</h2>
      <p className="text-[12px] text-[#aaa] mb-5">Останнє оновлення: червень 2025</p>

      {[
        {
          title: 'Авторські права на відео',
          text: 'Завантажуючи або додаючи посилання на відео, Ви підтверджуєте, що маєте всі необхідні права на використання цього контенту. Mist не несе відповідальності за порушення авторських прав третіх сторін. Перерозподіл оригінального відеоконтенту без дозволу правовласника заборонений.',
        },
        {
          title: 'Музичні треки та звуки',
          text: 'AI-підібрані музичні треки надаються виключно для використання в рамках платформи Mist. Треки ліцензовані для комерційного використання в соціальних мережах. Завантаження та перерозподіл треків за межами платформи без окремої ліцензії заборонено.',
        },
        {
          title: 'Обробка та зберігання даних',
          text: 'Ми зберігаємо мінімально необхідний обсяг персональних даних для надання послуг. Ваші відео та згенерований контент не передаються третім сторонам і не використовуються для навчання AI-моделей без Вашої явної згоди. Дані зберігаються на захищених серверах у відповідності до GDPR.',
        },
        {
          title: 'Поширення згенерованого контенту',
          text: 'Контент, створений за допомогою Mist, є Вашою власністю. Ви маєте право публікувати його на будь-яких платформах. Ми залишаємо за собою право використовувати знеособлені метрики для покращення якості сервісу.',
        },
        {
          title: 'Обмеження відповідальності',
          text: 'Mist надає сервіс "як є". Ми не гарантуємо безперебійну роботу та не несемо відповідальності за непрямі збитки, пов\'язані з використанням платформи.',
        },
      ].map((section, i) => (
        <div key={i} className="mb-4">
          <h3 className="text-[13px] font-bold text-[#1A1A1A] mb-1">{section.title}</h3>
          <p className="text-[12px] text-[#666] leading-relaxed">{section.text}</p>
        </div>
      ))}

      <button
        onClick={onClose}
        className="w-full mt-2 py-3 rounded-full text-white text-[13px] font-semibold"
        style={{ background: 'linear-gradient(135deg,#E8799A,#D63384)', fontFamily: "'Onest', sans-serif" }}>
        Зрозуміло
      </button>
    </div>
  </div>
);

// ——— Ліва панель ———
const LeftPanel = () => (
  <div className="hidden lg:flex flex-col items-center justify-center flex-[0_0_60%] px-14 py-14 gap-8 relative z-10">
    <div>
      <div className="text-4xl font-extrabold tracking-tight bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent text-center mb-3">
        mist
      </div>
      <p className="text-[15px] text-[#555] text-center leading-relaxed max-w-xs mx-auto">
        Ваш відеоконтент тепер<br />
        <span className="font-bold text-[#1A1A1A]">працює на Вас всюди</span>
      </p>
    </div>

    <div className="w-full max-w-95 rounded-[18px] overflow-hidden border border-white/80 shadow-xl"
      style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)' }}>
      <div className="px-3 py-2 border-b border-black/5 flex items-center gap-2"
        style={{ background: 'rgba(0,0,0,0.04)' }}>
        <div className="text-[10px] text-[#aaa] flex-1 text-center bg-black/5 rounded-md py-1 px-2">
          youtube.com/watch?v=abc123XyZ
        </div>
      </div>
      <div className="w-full h-35 relative flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 50%)' }} />
        <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center relative z-10"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
          <ArrowRight size={14} color="white" />
        </div>
        <div className="absolute bottom-2 left-3 right-3 text-[9px] text-white/85 font-semibold leading-snug z-10">
          Як запустити стартап з нуля у 2025 — повний гайд для початківців
        </div>
      </div>
      <div className="px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg,#E8799A,#D63384)' }}>М</div>
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-[#1A1A1A]">Максим Коваль</div>
          <div className="text-[9px] text-[#aaa]">Business UA · 1 день тому</div>
        </div>
        <div className="text-[9px] text-[#bbb]">48K переглядів</div>
      </div>
    </div>

    <div className="flex flex-col gap-2 w-full max-w-95">
      {[
        { dot: 'bg-green-500', text: 'Аналізую субтитри відео...', badge: true },
        { dot: 'bg-purple-500', text: 'Тон підібрано для LinkedIn', badge: false },
        { dot: 'bg-yellow-400', text: 'Lo-fi chill beat — підібрано AI', badge: false },
      ].map((b, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/80 shadow-sm"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(18px)' }}>
          <div className={`w-2 h-2 rounded-full shrink-0 ${b.dot}`} />
          <span className="text-[12px] text-[#444] font-medium flex-1">{b.text}</span>
          {b.badge && (
            <span className="text-[9px] font-semibold text-green-700 bg-green-500/10 border border-green-500/25 rounded-full px-2 py-0.5">
              live
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ——— Екран Login ———
const LoginScreen = ({ onSwitch, onTerms }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginRequest(data);
      const { token, user } = response.data;
      login(token, user);
      navigate('/dashboard');
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Невірний email або пароль',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h1 className="text-[22px] font-extrabold tracking-tight text-[#1A1A1A] mb-1">З поверненням</h1>
      <p className="text-[14px] text-[#888] mb-6">
        Ще немає акаунту?{' '}
        <button type="button" onClick={() => onSwitch('register')} className="text-[#D63384] font-semibold hover:underline">
          Зареєструйтесь
        </button>
      </p>
      <div className="flex flex-col gap-4 mb-2">
<Input label="Email" type="text" placeholder="your@email.com" icon={<Mail size={15} />}
  error={errors.email?.message} {...register('email')} />
        <Input label="Пароль" type="password" placeholder="••••••••" icon={<Lock size={15} />}
          error={errors.password?.message} {...register('password')} />
      </div>
      <div className="text-right mb-5">
        <button type="button" onClick={() => onSwitch('forgot')} className="text-[12px] text-[#D63384] font-medium hover:underline">
          Забули пароль?
        </button>
      </div>
      {errors.root && <p className="text-[12px] text-red-500 text-center mb-3 font-medium">{errors.root.message}</p>}
      <Button type="submit" isLoading={isSubmitting}>Увійти</Button>
      <p className="text-[11px] text-[#aaa] text-center mt-4 leading-relaxed">
        Натискаючи, Ви погоджуєтесь з{' '}
        <button type="button" onClick={onTerms} className="text-[#D63384] font-medium hover:underline">умовами використання</button>
      </p>
    </form>
  );
};

// ——— Екран Register ———
const RegisterScreen = ({ onSwitch, onTerms }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      onSwitch('verify');
    } catch (error) {
      setError('root', { message: 'Помилка реєстрації' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h1 className="text-[22px] font-extrabold tracking-tight text-[#1A1A1A] mb-1">Почніть безкоштовно</h1>
      <p className="text-[14px] text-[#888] mb-6">
        Вже є акаунт?{' '}
        <button type="button" onClick={() => onSwitch('login')} className="text-[#D63384] font-semibold hover:underline">
          Увійдіть
        </button>
      </p>
      <div className="flex flex-col gap-4 mb-5">
        <Input label="Ім'я" type="text" placeholder="Як до Вас звертатись?" icon={<User size={15} />}
          error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="text" placeholder="your@email.com" icon={<Mail size={15} />}
          error={errors.email?.message} {...register('email')} />
        <Input label="Пароль" type="password" placeholder="Придумайте надійний пароль" icon={<Lock size={15} />}
          error={errors.password?.message} {...register('password')} />
      </div>
      {errors.root && <p className="text-[12px] text-red-500 text-center mb-3 font-medium">{errors.root.message}</p>}
      <Button type="submit" isLoading={isSubmitting}>Створити акаунт</Button>
      <p className="text-[11px] text-[#aaa] text-center mt-4 leading-relaxed">
        Реєструючись, Ви погоджуєтесь з{' '}
        <button type="button" onClick={onTerms} className="text-[#D63384] font-medium hover:underline">умовами</button> та{' '}
        <button type="button" onClick={onTerms} className="text-[#D63384] font-medium hover:underline">політикою конфіденційності</button>
      </p>
    </form>
  );
};

// ——— Екран Verify ———
const VerifyScreen = ({ onSwitch }) => (
  <div className="w-full text-center">
    <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg,#fce4ec,#f48fb1)' }}>
      <Mail size={24} className="text-[#D63384]" />
    </div>
    <h1 className="text-[22px] font-extrabold tracking-tight text-[#1A1A1A] mb-2">Перевірте пошту</h1>
    <p className="text-[14px] text-[#888] mb-4 leading-relaxed">
      Ми надіслали посилання для підтвердження на Вашу адресу
    </p>
    <div className="inline-block bg-[#E8799A]/10 border border-[#E8799A]/25 rounded-full px-5 py-2 text-[12px] font-semibold text-[#D63384] mb-5">
      your@email.com
    </div>
    <p className="text-[12px] text-[#bbb] leading-relaxed mb-5">
      Не отримали листа?<br />Перевірте папку Спам або надішліть ще раз
    </p>
    <Button type="button">
      <span className="flex items-center justify-center gap-2">
        <RefreshCw size={14} /> Надіслати ще раз
      </span>
    </Button>
    <button type="button" onClick={() => onSwitch('login')}
      className="w-full mt-3 py-3 rounded-full border border-[#D63384]/20 text-[#D63384] text-[13px] font-medium hover:bg-[#D63384]/5 transition-colors">
      Повернутись до входу
    </button>
  </div>
);

// ——— Екран Forgot Password ———
const ForgotScreen = ({ onSwitch }) => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    // forgotRequest(data) — підключимо пізніше
    setSent(true);
  };

  if (sent) return (
    <div className="w-full text-center">
      <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#fce4ec,#f48fb1)' }}>
        <Mail size={24} className="text-[#D63384]" />
      </div>
      <h1 className="text-[22px] font-extrabold tracking-tight text-[#1A1A1A] mb-2">Лист надіслано</h1>
      <p className="text-[14px] text-[#888] mb-6 leading-relaxed">
        Перевірте пошту та перейдіть за посиланням для скидання пароля
      </p>
      <button type="button" onClick={() => onSwitch('login')}
        className="w-full py-3 rounded-full border border-[#D63384]/20 text-[#D63384] text-[13px] font-medium hover:bg-[#D63384]/5 transition-colors">
        Повернутись до входу
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <button type="button" onClick={() => onSwitch('login')}
        className="flex items-center gap-1 text-[12px] text-[#aaa] hover:text-[#888] transition-colors mb-6">
        <ArrowRight size={13} className="rotate-180" /> Назад до входу
      </button>
      <h1 className="text-[22px] font-extrabold tracking-tight text-[#1A1A1A] mb-1">Відновлення пароля</h1>
      <p className="text-[14px] text-[#888] mb-6 leading-relaxed">
        Введіть email — ми надішлемо посилання для скидання пароля
      </p>
      <div className="mb-5">
        <Input label="Email" type="email" placeholder="your@email.com" icon={<Mail size={15} />}
          error={errors.email?.message} {...register('email')} />
      </div>
      <Button type="submit" isLoading={isSubmitting}>Надіслати посилання</Button>
    </form>
  );
};

// ——— Головний компонент ———
const LoginPage = () => {
  const [screen, setScreen] = useState('login');
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="min-h-screen flex overflow-hidden relative" style={{ background: '#FDFAF7', fontFamily: "'Onest', sans-serif" }}>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}

      <div className="fixed rounded-full pointer-events-none z-0"
        style={{ width: 500, height: 500, background: '#f48fb1', top: -150, left: -100, opacity: .22, filter: 'blur(100px)' }} />
      <div className="fixed rounded-full pointer-events-none z-0"
        style={{ width: 380, height: 380, background: '#F5C842', bottom: 0, right: '20%', opacity: .13, filter: 'blur(100px)' }} />
      <div className="fixed rounded-full pointer-events-none z-0"
        style={{ width: 300, height: 300, background: '#E8799A', top: '30%', left: '35%', opacity: .12, filter: 'blur(100px)' }} />

      <LeftPanel />

      <div className="flex-[0_0_100%] lg:flex-[0_0_40%] flex flex-col items-center justify-center px-10 py-12 relative z-10"
        style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(24px)', borderLeft: '1px solid rgba(255,255,255,0.85)' }}>
        <div className="w-full max-w-[320px]">
          {screen === 'login' && <LoginScreen onSwitch={setScreen} onTerms={() => setShowTerms(true)} />}
          {screen === 'register' && <RegisterScreen onSwitch={setScreen} onTerms={() => setShowTerms(true)} />}
          {screen === 'verify' && <VerifyScreen onSwitch={setScreen} />}
          {screen === 'forgot' && <ForgotScreen onSwitch={setScreen} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;