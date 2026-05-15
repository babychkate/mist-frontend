import useAuthStore from '../store/authStore';

const useAuth = () => {
  const { token, user, isAuthenticated, login, logout, setUser } = useAuthStore();

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
  };
};

export default useAuth;