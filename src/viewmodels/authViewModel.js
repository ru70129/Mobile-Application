import { useAuthStore } from '../store/authStore';

// Auth ViewModel following MVVM pattern
export const useAuthViewModel = () => {
  const { user, login, logout } = useAuthStore();

  const handleLogin = (userData) => {
    // In a real app, this would validate credentials via API
    // For now, just set the user
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    user,
    handleLogin,
    handleLogout,
    isAuthenticated: user !== null,
  };
};