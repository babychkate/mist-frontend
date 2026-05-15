import { create } from 'zustand';
import { getToken, setToken, removeToken } from '../utils/token.utils';

const useAuthStore = create((set) => ({
  token: getToken(),
  user: null,
  isAuthenticated: !!getToken(),

  login: (token, user) => {
    setToken(token);
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    removeToken();
    set({ token: null, user: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;