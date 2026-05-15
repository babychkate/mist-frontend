import { useNavigate, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { brand } from '../../utils/theme';

// variant:
//   'app'     — дашборд/історія (лого + tabs + avatar + новий mist)
//   'wizard'  — візард (лого + скасувати + avatar)
//   'landing' — лендінг (лого + увійти + почати)

const Navbar = ({ variant = 'app' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'К';
  const firstLetter = userName.charAt(0).toUpperCase();

  const isDashboard = location.pathname === '/dashboard';
  const isHistory = location.pathname === '/history' || location.pathname.startsWith('/mist');

  if (variant === 'landing') {
    return (
      <nav className="flex justify-between items-center px-12 py-4 sticky top-0 z-50 border-b border-black/[0.07]"
        style={{ background: 'rgba(253,250,247,0.88)', backdropFilter: 'blur(14px)' }}>
        <div className="text-3xl font-extrabold tracking-tight bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent">
          mist
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-full border border-black/0.18 text-sm font-medium hover:bg-black/0.04 transition-colors">
            Увійти
          </button>
          <button onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#333] transition-colors">
            Почати
          </button>
        </div>
      </nav>
    );
  }

  if (variant === 'wizard') {
    return (
      <nav className="flex items-center justify-between px-10 sticky top-0 z-50 border-b border-white/85"
        style={{ height: 58, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)' }}>
        <div className="text-xl font-extrabold tracking-tight bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent">
          mist
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')}
            className="px-4 py-1.5 rounded-full border border-black/0.12 text-sm text-[#888] hover:bg-black/4 transition-colors">
            Скасувати
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
            style={{ background: brand.gradient }}>
            {firstLetter}
          </div>
        </div>
      </nav>
    );
  }

  // variant === 'app'
  return (
    <nav className="flex items-center justify-between px-10 sticky top-0 z-50 border-b border-white/85"
      style={{ height: 58, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)' }}>
      <div
        onClick={() => navigate('/dashboard')}
        className="text-xl font-extrabold tracking-tight bg-linear-to-br from-[#E8799A] to-[#D63384] bg-clip-text text-transparent cursor-pointer">
        mist
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          style={isDashboard
            ? { background: 'rgba(214,51,132,0.08)', color: '#D63384', fontWeight: 600 }
            : { color: '#888' }
          }>
          Дашборд
        </button>
        <button
          onClick={() => navigate('/history')}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          style={isHistory
            ? { background: 'rgba(214,51,132,0.08)', color: '#D63384', fontWeight: 600 }
            : { color: '#888' }
          }>
          Історія
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/wizard')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-px"
          style={{ background: brand.gradient, boxShadow: brand.shadow }}>
          <Plus size={14} /> Новий mist
        </button>
        <div onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
          style={{ background: brand.gradient }}>
          {firstLetter}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
